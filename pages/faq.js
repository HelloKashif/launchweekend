import Head from "next/head";
const faqs = [
  {
    q: "Is this event a monthly thing?",
    a: "Yes, this event occurs on the last weekend of the month @01:00am UTC",
  },
  {
    q: "Do I always have to work on a Startup?",
    a:
      "No, you can work on any tech project like open source library, any learning activity, startup idea, proof of concept etc. The only requirement is that you must release something in public within 48hrs.",
  },
  {
    q: "Can I get help if I get stuck?",
    a:
      "Yes, ofcourse, If you have any technical question we can arrange a call/chat and help you.",
  },
  {
    q: "Do we release the project within 48hrs or after 48hr?",
    a: "Within.",
  },
  {
    q: "Does the project need to be 100% complete while releasing",
    a:
      "No. As long as it is kinda usable and communicates the message of the product to the user its fine.",
  },
];

const FAQ = (props) => {
  return (
    <div className="">
      <Head>
        <title>FAQ | Launch Weekend</title>
      </Head>
      <section className="mt-12 px-2 sm:px-0 flex flex-col sm:items-center">
        <h3 className="mb-9 font-light text-2xl sm:text-4xl">
          Frequently Asked Questions
        </h3>
        <ul className="space-y-5 max-w-2xl">
          {faqs.map((qa, i) => (
            <li key={i} className="py-4 border-b border-gray-700 sm:px-3">
              <h4 className="text-base sm:text-lg">{qa.q}</h4>
              <p className="text-sm sm:text-base text-gray-400">{qa.a}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FAQ;
