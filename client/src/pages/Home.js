import React, { useEffect, useState } from "react";
import API from "../utils/API";

import Wrapper from "../components/Wrapper";
import HeroCarousel from "../components/HeroCarousel";
import Buttons from "../components/Buttons";
import Banner from "../components/Banner";
import PageTitle from "../components/PageTitle";
import ActivePostsCard from "../components/ActivePostsCard";
import Search from '../components/Search';
import Filter from '../components/Filter';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// const items = [
//     {
//         image: "https://godolly.com/wp-content/uploads/2019/04/9B90AF87-8EFF-4C73-BAB0-0B093BAA101D.jpeg",
//         title: "Leather Couch",
//         text: "Leather couch in mild conditions, very confortable with no visible discoloring",
//         type: "goods",
//         update: "Last updated 3 mins ago"
//     },
//     {
//         image: "https://www.sefiles.net/merchant/1929/images/site/SouthPhillypics003.jpg",
//         title: "Kids bicycle",
//         text: "Metal fan no longer needed. It works great and is not very noisy",
//         type: "goods",
//         update: "Last updated 3 mins ago"
//     },
//     {
//         image: "https://lh3.googleusercontent.com/-YUYVs2pXjmc8fluITFhLDf5-cziydPyqsNSEqPEZNJtDIWN7qOTNr66DwQqNI3mijDvn5VPPxnb2N0NNA=s1600",
//         title: "House Painting",
//         text: "Will help  painting houses! I have some spare colors and tools",
//         type: "services",
//         update: "Last updated 3 mins ago"
//     },
//     {
//         image: "https://i.ebayimg.com/images/g/S0sAAOSwwgddC65r/s-l640.jpg",
//         title: "Floor metal fan",
//         text: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
//         type: "goods",
//         update: "Last updated 3 mins ago"
//     },
//     {
//         image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/1/15/iStock-516844708_colorful-garden-path.jpg.rend.hgtvcom.616.462.suffix/1516141969592.jpeg",
//         title: "Landscaping",
//         text: "Free gardening help and flowers",
//         type: "services",
//         update: "Last updated 3 mins ago"
//     },
//     {
//         image: "https://www.delta.edu/_resources/images/universal-1920x1282/used-projector.jpg",
//         title: "720p Projector",
//         text: "Functional projector with built in speakers",
//         type: "goods",
//         update: "Last updated 3 mins ago"
//     },
//     {
//         image: "",
//         title: "Giveaway on x place",
//         text: "There is an event this weekend on x y z",
//         type: "events",
//         update: "Last updated 3 mins ago"
//     },
// ];

function Home() {
    const [allPosts, setAllPosts] = useState([]);
    let [searchResults, setSearchResults]= useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterObject, setFilterObject] = useState({
        offerRequestEvent: "",
        type: "",
        category: "",
        location: "",
        timeSensitive: false,
        onlineRemote: false,
        pickUpOnly: false,
        atCurbNow: false,
        dropOffNeeded: false,
        lackConsistentCommunication: false,
        limitedCapacity: false,
        groupRequest: false
    });

    // This code runs on page load only
    useEffect(() => {
        API.getPosts()
        .then(dbPosts => setAllPosts(dbPosts.data))
        .catch(err => console.log(err));
    }, []);
    
    // This code runs every time the search input changes
    useEffect(() => {
        searchPosts(searchTerm)
    }, [searchTerm, allPosts]);

    // This code runs every time the filter inputs change
    useEffect(() => {
        filterPosts()
    }, [filterObject, allPosts]);

    function filterPosts() {
        // Filters the allPosts array and excludes the post if the filterObject criteria is not matched
        const results = allPosts.filter(item => {
            // Radio buttons
            if (filterObject.offerRequestEvent === "offer" && item.offerRequestEvent !== "offer") return false;
            if (filterObject.offerRequestEvent === "request" && item.offerRequestEvent !== "request") return false;
            if (filterObject.offerRequestEvent === "event" && item.offerRequestEvent !== "event") return false;
            if (filterObject.type === "good" && item.type !== "good") return false;
            if (filterObject.type === "service" && item.type !== "service") return false;
            // Dropdown selects
            if (filterObject.category !== "" && item.category !== filterObject.category) return false;
            if (filterObject.location !== "" && item.location !== filterObject.location) return false;
            // Check boxes
            if (filterObject.timeSensitive && !item.timeSensitive) return false;
            if (filterObject.onlineRemote && !item.onlineRemote) return false;
            if (filterObject.pickUpOnly && !item.pickUpOnly) return false;
            if (filterObject.atCurbNow && !item.atCurbNow) return false;
            if (filterObject.dropOffNeeded && !item.dropOffNeeded) return false;
            if (filterObject.lackConsistentCommunication && !item.lackConsistentCommunication) return false;
            if (filterObject.limitedCapacity && !item.limitedCapacity) return false;
            if (filterObject.groupRequest && !item.groupRequest) return false;
            return true;
        });
        // If the item passed all the applied filters
        setSearchResults(results);
    }

    function searchPosts(searchTerm) {
        // Searches the allPosts array and includes the post if the search term appears in any of the fields
        const term = searchTerm.toLowerCase().trim();
        const results = allPosts.filter(item => {
                // All posts have these fields
            if (item.offerRequestEvent.toLowerCase().includes(term)) return true;
            if (item.title.toLowerCase().includes(term)) return true;
            if (item.description.toLowerCase().includes(term)) return true;
            if (item.category.toLowerCase().includes(term)) return true;
                // Only some posts have these fields, so we have to check that they exist first
            if (item.searchTags && item.searchTags.toLowerCase().includes(term)) return true;
            if (item.searchTags && item.location.toLowerCase().includes(term)) return true;
            if (item.requestOnBehalfOf && item.requestOnBehalfOf.toLowerCase().includes(term)) return true;
            if (item.offerCapacity && item.offerCapacity.toLowerCase().includes(term)) return true;
            if (item.personsRequestingService && item.personsRequestingService.toLowerCase().includes(term)) return true;
            if (item.eventSpaceRules && item.eventSpaceRules.toLowerCase().includes(term)) return true;
            if (item.eventHostOrg && item.eventHostOrg.toLowerCase().includes(term)) return true;
            if (item.cashAppHandle && item.cashAppHandle.toLowerCase().includes(term)) return true;
            if (item.venmoHandle && item.venmoHandle.toLowerCase().includes(term)) return true;
            if (item.payPalEmail && item.payPalEmail.toLowerCase().includes(term)) return true;

            // If the search term wasn't found
            return false;
        });
        setSearchResults(results);
    };
    
    function handleChange(event) {
        setSearchTerm(event.target.value);
    };

    function handleCheck(event) {
        if (event.target.checked) {
            setFilterObject({
                ...filterObject,
                [event.target.name]: true
            });
        } else {
            setFilterObject({
                ...filterObject,
                [event.target.name]: false
            });
        }
    };

    function handleRadio(event) {
        if (event.target.checked) {
            setFilterObject({
                ...filterObject,
                [event.target.name]: event.target.value
            })
        }
    };

    function handleSelect(event) {
        if ((event.target.value === "All Categories") || 
            (event.target.value === "All Locations")) {
            setFilterObject({
                ...filterObject,
                [event.target.name]: ""
            });
        } else {
            setFilterObject({
                ...filterObject,
                [event.target.name]: event.target.value
            });
        }
    };

    function clearFilters() {
        setFilterObject({
            offerRequestEvent: "",
            type: "",
            category: "",
            location: "",
            timeSensitive: false,
            onlineRemote: false,
            pickUpOnly: false,
            atCurbNow: false,
            dropOffNeeded: false,
            lackConsistentCommunication: false,
            limitedCapacity: false,
            groupRequest: false
        });
    }

    return (
        <>
            <HeroCarousel />
            <div id="see-posts"></div>
            <Buttons />
            <Banner>
                <Search
                    searchTerm={searchTerm}
                    handleChange={handleChange}
                />
                <Filter
                    filterObject={filterObject}
                    handleCheck={handleCheck}
                    handleRadio={handleRadio}
                    handleSelect={handleSelect}
                    clearFilters= {clearFilters}
                />
            </Banner>
            <Wrapper>
                {searchResults.length === 0 ? (
                    <PageTitle>No posts to display</PageTitle>
                ) : (
                    <Row className="mb-5">
                        {searchResults.map(post => (
                            <Col xl="2" md="3" xs="6" key={post._id} >
                                <ActivePostsCard post={post}/>
                            </Col>
                        ))}
                    </Row>
                )} 
            </Wrapper>
        </>
    );
}
export default Home;