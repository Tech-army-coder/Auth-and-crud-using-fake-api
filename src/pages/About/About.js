
const About = () => {
   const currentDate = new Date();
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const date = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
   <div className=" home-data ">
    <h1 className="display-4">About Page</h1>
    <h6 className="mb-3">Today is {day}, {date}</h6>
    <h4 className="lead">Welcome to our website! We're glad you're here.</h4>
  </div>
  );
}

export default About