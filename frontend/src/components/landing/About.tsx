const About = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "SplitEasy made our group trip so much easier! No more messy spreadsheets.",
      role: "Frequent Traveler",
    },
    {
      name: "John D.",
      text: "I love how simple it is to track shared expenses with my roommates.",
      role: "Student",
    },
    {
      name: "Emily R.",
      text: "The settlement reminders are a game-changer. Highly recommend!",
      role: "Freelancer",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">About SplitEasy</h3>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            SplitEasy was created to simplify group expense management. Whether you're splitting a dinner bill, planning a trip, or sharing rent, our platform ensures transparency and ease. Our mission is to make financial collaboration stress-free and fair for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <p className="text-gray-800 font-semibold">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;