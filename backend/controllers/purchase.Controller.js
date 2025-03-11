import Stripe from "stripe";
import { Course } from "../models/course.Model.js";
import { Purchase } from "../models/purchase.Model.js";
import { User } from "../models/user.Model.js";

export const stripeSessionController = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const { origin } = req.headers;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!courseData || !userData) {
      return res.status(400).send({
        success: false,
        message: "Data not Found",
      });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId: userData._id,
      amount: (
        courseData.price -
        (courseData.discount * courseData.price) / 100
      ).toFixed(2),
    };
    const newPurchase = await Purchase.create(purchaseData);

    // stripe Gateway initialization

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    //lineItems
    const currency = process.env.CURRENCY
      ? process.env.CURRENCY.toLowerCase()
      : "usd";
    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.title,
          },
          unit_amount: Math.floor(newPurchase.amount) * 100,
        },
        quantity: 1,
      },
    ];

    // staring session
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/myenrollments`,
      cancel_url: `${origin}/`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    return res.status(200).send({
      success: true,
      message: "Creating Payment Session",
      session_url: session.url,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


//stripe webhook

const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY)
export const stripeWebHook=async(req,res)=>{
    const sig=req.headers['stripe-signature']

    let event;
    try {
       event=stripeInstance.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET_KEY)

       if(event.type==='payment_intent.succeeded'){
        const paymentIntent=event.data.object
        const paymentIntentId=paymentIntent.id

        const session=await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId
        })

        const {purchaseId}=session.data[0].metadata

        const purchaseData=await Purchase.findById(purchaseId)

        const userData=await User.findById(purchaseData.userId)
       }

    //    event=Stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET_KEY)
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
          });
    }
}