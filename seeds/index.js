const mongoose = require('mongoose')
const { places, descriptors } = require('./seedHelpers')
const cities = require('./cities')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('databse connected!!')
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '60d299e25da21b2b7830e779',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci odit blanditiis enim obcaecati error veritatis quam maxime totam, ducimus qui, mollitia laboriosam nam. Error soluta expedita repudiandae veritatis. Vitae, aperiam.',
            price,
            geometry: { 
                type : "Point", 
                coordinates :[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dq8pxztdy/image/upload/v1628302779/YelpCamp/lg1t4zkdnfmyphyrpciv.png',
                    filename: 'YelpCamp/bzvzwdxry0awtkauhg1r'
                    
                },
                {
                    url: 'https://res.cloudinary.com/dq8pxztdy/image/upload/v1625708818/YelpCamp/molcjlqjnp2d7lrck6s9.jpg',
                    filename: 'YelpCamp/inwtjo1srnrheun7pqld'
                }
            ]
        })
        await camp.save();
    }
}


seedDb().then(() => {
    mongoose.connection.close();
})