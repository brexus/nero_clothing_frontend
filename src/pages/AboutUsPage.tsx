import DefaultLayout from "@/layouts/DefaultLayout.tsx";

const AboutUsPage = () => {
    return (
        <DefaultLayout>
            <section className="flex flex-col md:flex-row min-h-[calc(100vh-160px)]">
                <div className="w-full md:w-2/7 h-[200px] md:h-auto overflow-hidden">
                    <img
                        src={"/pages/AboutUs/1.jpg"}
                        alt={"About Us"}
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="w-full md:w-5/7 flex flex-col p-10 justify-center items-center text-center">
                    <h1 className="text-3xl font-semibold py-2 tracking-wide">About Us</h1>
                    <p className="text-gray-700 leading-relaxed">
                        It all started back in high school, when I used to sketch clothing ideas in my notebook during class.
                        What was once a small passion slowly grew into something bigger.
                        Today, as a university graduate, I’ve turned that dream into reality by creating this clothing brand and store.
                        It’s the result of years of curiosity, learning, and love for design.
                    </p>

                    <h1 className="text-3xl font-semibold py-4 tracking-wide">Our Mission</h1>
                    <p className="text-gray-700 leading-relaxed">
                        Fashion has always been a big part of my life. We spend time observing people both online and on the streets,
                        not to judge them, but to understand them. The goal is simple - to help people feel confident in what they wear
                        and to bring more style and comfort to everyday life.
                        I believe fashion should be about balance, where comfort meets individuality.
                    </p>

                    <h1 className="text-3xl font-semibold py-4 tracking-wide">Our Team</h1>
                    <p className="text-gray-700 leading-relaxed">
                        The brand was founded by someone from a small town who turned his interest in fashion into a real business.
                        Through persistence and creativity, this brand became a way to express ideas and connect with others who share the same mindset.
                        Every collection is part of that journey - an honest reflection of growth, passion, and the belief that it’s worth chasing what you love.
                    </p>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default AboutUsPage;
