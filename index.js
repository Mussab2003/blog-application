import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3333;
var id;


var Category = [
  "Travel",
  "News",
  "Recipes",
  "Fitness",
  "Technology",
  "Finance",
  "Productivity",
  "Health",
  "Education",
  "Games",
  "sports",
];

var num = 0;

function BlogModel(category, date, title, description) {
  this.id = num++;
  this.date = date;
  this.category = category;
  this.title = title;
  this.description = description;
}

var blogObject = [];

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

var dummyData = [
  new BlogModel(
    Category[4],
    ["Mar", 19],
    "I Built an App in 6 Hours that Makes $1,500/Mo",
    "Here is the simple web app I created in 6 hours. It is a Finnish rental cottage finder that has more than 5,000 users every month.The working principle is simple. The app grabs the information that the user enters and opens up our partner’s website with the cottages based on the user-specified criteria. Anybody with basic web development skills could create this kind of app in hours. But how does this make any money? It’s a simple affiliate deal.When a user clicks “FIND!”, they click my affiliate link which our partner notices. If the visitor then rents any cottage in the next 14 days, we earn a $22 commission.Where do the users come from? Anybody can code an app. But getting people to use it is the hard part."
  ),
  new BlogModel(
    Category[7],
    ["Nov", 16],
    "What Happens When You Start Reading Every Day",
    "I love reading. Reading is the best habit you can build to boost every part of your life. I don’t mind reading an ebook, but I prefer a physical book. The smell of new pages is magical.But who has the time to sit down with a book in this highly distracted world where social media, especially video culture, is everywhere? People (adults) spend almost 2 to 3 hours a day on smartphones and television. Before continuing with this article, check your screen time. You will be surprised to learn how much time you waste daily by doing nothing on your smartphone except aimlessly scrolling. What if you gave some of that time to books? Today, I am going to share how reading can benefit you. A couple of weeks ago, I wrote an article about how reading affects your brain, which went viral. Here are the articles if you would like to know more."
  ),
  new BlogModel(
    Category[1],
    ["Jan", 15],
    "Is Flutter Facing its End?",
    "Let me begin by apologizing if the title rubbed you the wrong way. I’ve always been a fan of Google’s products, especially their efforts in mobile development. When it comes to popular cross-platform mobile development frameworks like Xamarin, React Native, and Flutter, my preference leans strongly towards Flutter. This preference is partly due to Google’s involvement and partly due to the growing popularity of Flutter, as evidenced by recent statistics on Stack Overflow questions asked. However, there has been an unexpected development recently: Google has laid off teammates from the Flutter and Dart teams (source). This came as a surprise to me and prompted me to ponder the possible reasons behind it. It doesn’t appear to be a broad restructuring, as it seems to have affected only specific areas."
  ),
  new BlogModel(
    Category[10],
    ["Jun", 28],
    "Euro 2024 Winners & Losers — The Only Euros Group Stage Round Up You’ll Need",
    "A bit of history, Hungary’s striker Adam reading this at lunch & the winners & losers from the group stages of Euro 2024 in this roundup. It isn’t too shabby for a primarily European international football tournament to manage to captivate a global audience in 2024 given UEFA’s offshoot & answer to FIFA’s World Cup began only in the 1960s. Of course though, it’s football & the international tournaments in the summer give every football fan a reason to cancel plans & be Bruce Wayne in his bat cave instead of scrolling through transfer news mindlessly on Twitter — it’s such a thing that even Elon Musk might start tweeting about transfers too if it isn’t Fabrizio Romano. The Euros are like mini World Cups, and even England are part of the Euros — the only thing inclusively European about the UK since Brexit. In India though, where cricket borders on religion, football is slowly growing — it’s become staggeringly more popular than when I was a teen watching Euro 2004 & 2008 or the 2002 & 2006 World Cups. But while India’s qualification for the World Cup remains a pipe dream, I’ll take the late nights watching the Euros, thank you very much. There were only four teams in the initial version of the Euros held in 1960 — then called the European Nations’ Cup — it only expanded to eight teams in the 1980 edition and to sixteen in 1996. The French Football Federation’s secretary-general Henri Delaunay proposed the idea for an inter-European national cup tournament in 1927 as football began to expand & evolve but perhaps that idea came too soon. Those were nascent yet exciting times tactically speaking, and arguably set the basis for the modern game we know today."
  ),
  new BlogModel(
    Category[2],
    ["Apr", 26],
    "3 Smoothie Recipes That Helped Me Reduce Brain Fog",
    "Are you getting enough fruits and veggies? Enjoy this article, but please don’t look to me for future nutritional advice. I ate a cheeseburger at a concert last night with a Philly cheesesteak egg roll on the side. Why am I sharing smoothie recipes?  Because I wanted to write about something different this week! And it’s my blog, so you’re gonna have to suck it up for a few minutes. Jk. The real reason is that I made a goal to eat more brain food this year and reduce brain fog so I could get the most out of each day. To do that, I need to incorporate more superfoods into my diet — foods packed with vitamins, minerals, protein, and fiber. The problem is that it takes a lot of work to cram superfoods into all your meals. I mean, it’s possible, but I just don’t have the time or the skill to do it yet. That’s where a blender helps. Smoothies conveniently mix a variety of nuts, fruits, and veggies, which help round out my diet. Here are my three favorite recipes I’ve learned so far."
  )
];

blogObject.push(dummyData[0]);
blogObject.push(dummyData[1]);
blogObject.push(dummyData[2]);
blogObject.push(dummyData[3]);
blogObject.push(dummyData[4]);

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  var content = [];
  if (blogObject.length > 4) {
    const randomNum = new Set();
    while (randomNum.size < 4) {
      var num1 = Math.floor(Math.random() * blogObject.length);
      randomNum.add(num1);
    }
    const myArray = Array.from(randomNum);
    for (var i = 0; i < myArray.length; i++) {
      content[i] = blogObject[myArray[i]];
    }
    res.render("index.ejs", { data: content });
  } else {
    res.render("index.ejs", { data: blogObject });
  }
});

app.get("/create-blog", (req, res) => {
  res.render("createBlog.ejs", { category: Category });
});

app.post("/submit", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var category = req.body.category;
  var m = new Date();
  var date = [month[m.getMonth()], m.getDate()];
  var blogItem = new BlogModel(category, date, title, description);
  console.log("This is the id: " + blogItem.id);
  blogObject.push(blogItem);
  res.redirect("/");
});

app.get("/all-blogs", (req, res) => {
  res.render("allBlogs.ejs", { blogs: blogObject });
  //console.log(blogObject);
});

app.post("/id", (req, res) => {
  id = req.body.id;
  console.log(id);
  //console.log(blogObject[id]);
  res.status(200).json({ message: 'ID received successfully' });
});

app.get("/blog", (req, res) => {
  var boolean = true;
  var object = blogObject.find((item) => item.id == id);
  res.render("blog.ejs", { data: object , check : boolean});
});

app.get("/delete-post", (req, res) => {
  var index;
  for(let i=0; i<blogObject.length; i++){
    if(blogObject[i].id == id){
      index = i;
    }
  }
  if(index > 0){
    blogObject.splice(index, 1);
  }
  else{
    blogObject.shift();
  }
  res.redirect("/");
  console.log(blogObject);
});

app.get("/featured-blog", (req, res) => {
  var boolean = false;
  var object_featured = new BlogModel(
    Category[4],
    ["May", 31],
    "Don’t Just LeetCode; Follow the Coding Patterns Instead",
    "Coding Interviews are getting harder. To prepare for coding interviews, you will need weeks, if not months of preparation. No one likes spending that much time preparing for the coding interviews. So is there a smarter solution? First, let’s look at the problem. Anyone preparing for coding interviews definitely knows LeetCode. It is probably the biggest online repository for coding interview questions. Let’s take a look at what problems people face when using LeetCode. Problems with LeetCode. There are around 3k problems in LeetCode. The biggest challenge with LeetCode is its lack of organization; it has a huge set of coding problems, and you are not sure where to start or what to focus on. One wonders, is there an adequate number of questions one should go through to consider themselves prepared for the coding interview? I would love to see a streamlined process that guides me and teaches me enough algorithmic techniques to feel confident for the interview. As a lazy person myself, I wouldn’t like to go through even 500 questions. The Solution One technique that people often follow is to solve questions related to the same data structure; for example, focusing on questions related to Arrays, then LinkedList, HashMap, Heap, Tree, Graph, or Trie, etc. Although this does provide some organization, it still lacks coherence. For example, many questions can be solved using HashMap but still require different algorithmic techniques. I would love to see question sets that follow not only the same data structure but also similar algorithmic techniques. The best thing I came across was the problem-solving patterns like Sliding Window, Fast and Slow Pointers, Two Pointers, Two Heaps, Topological Sort, etc. Following these patterns helped me nurture my ability to ‘map a new problem to an already known problem’. This not only made this whole coding-interview-preparation process fun but also a lot more organized. Coding patterns enhance our “ability to map a new problem to an already known problem.” Coding Patterns I have gathered around 20 of these coding problem patterns that I believe can help anyone learn these beautiful algorithmic techniques and make a real difference in the coding interviews. The idea behind these patterns is that once you’re familiar with a pattern, you’ll be able to solve dozens of problems with it. For a detailed discussion of these patterns and related problems with solutions, take a look at Grokking the Coding Interview."
  );
  res.render('blog.ejs', {data: object_featured, check:boolean});
});

app.listen(port, () => {
  console.log("Lisstening at port " + port);
});
