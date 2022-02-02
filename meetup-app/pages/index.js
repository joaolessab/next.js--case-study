import { MongoClient } from 'mongodb';

// our-domain.com/
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props){
    return (
        <MeetupList meetups={ props.meetups } />
    );
}

/*export async function getServerSideProps(context){
    const req = context.req; // access to the request object
    const res = context.res; // access to the response object that will be sent back

    // fetch data from API

    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
    };
}*/

export async function getStaticProps(){
    // fetch data from an API
    const uri = 'mongodb+srv://joaolessab:p0dnfmwB1wrAP89o@cluster0.1euve.mongodb.net/meetups?retryWrites=true&w=majority'; 
    const client = await MongoClient.connect(uri);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;