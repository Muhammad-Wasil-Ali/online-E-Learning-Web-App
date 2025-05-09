import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

export default function ReviewsSection() {
  // Dummy data - replace with your actual ratings data
  const ratings = [
    {
      _id: "1",
      user: {
        name: "John Doe",
        avatar: "",
      },
      rating: 5,
      comment: "Excellent course! Learned so much about React.",
      createdAt: "2023-10-15",
    },
    {
      _id: "2",
      user: {
        name: "Jane Smith",
        avatar: "",
      },
      rating: 4,
      comment: "Great content, but some sections could be more detailed.",
      createdAt: "2023-09-28",
    },
  ];

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Student Reviews</h2>

      {/* Review Form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Leave a Review</h3>
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-gray-400 hover:text-yellow-400"
            >
              <Star
                className={`w-5 h-5 ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : ""
                }`}
              />
            </button>
          ))}
        </div>
        <Textarea
          placeholder="Share your experience with this course..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="mb-3"
        />
        <Button>Submit Review</Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {ratings.map((review) => (
          <div key={review._id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={review.user.avatar} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{review.user.name}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="ml-auto text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
