import React from 'react';

const ReviewCard = ({ review }) => (
  <div className="min-w-[340px] max-w-[340px] bg-richblack-800 p-6 border border-richblack-700 rounded-sm flex flex-col gap-4 shadow-md mx-3 shrink-0">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-caribbeangreen-200 to-caribbeangreen-400 flex items-center justify-center text-xl font-bold text-richblack-900 shrink-0">
        {review.name.charAt(0)}
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-richblack-5">{review.name}</h3>
        <p className="text-yellow-50 text-sm tracking-wider">
          {'★'.repeat(Math.floor(review.rating))}
          {review.rating % 1 !== 0 ? '☆' : ''}
        </p>
      </div>
    </div>
    <p className="text-richblack-300 text-sm leading-relaxed italic">
      "{review.text}"
    </p>
  </div>
);

const dummyReviews = [
  { name: "John Doe", rating: 4.5, text: "This platform is absolutely amazing. Highly recommended!" },
  { name: "Jane Smith", rating: 5, text: "I've learned so much in such a short amount of time." },
  { name: "Alice Johnson", rating: 4, text: "Great content, but could use more advanced topics." },
  { name: "Bob Williams", rating: 5, text: "The instructors are very knowledgeable and helpful." },
];

const ReviewCarousel = ({ reviews = dummyReviews }) => {
  // Duplicate the list enough times for a seamless loop
  const duplicated = [...reviews, ...reviews];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #000814 0%, transparent 100%)' }}
      />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #000814 0%, transparent 100%)' }}
      />

      {/* Scrolling track */}
      <div className="review-marquee flex w-max">
        {duplicated.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
