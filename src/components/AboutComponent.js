import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';

function RenderPartner({ partner }) {
    if (partner) {
        return (
            <React.Fragment>
                {/* <PartnerList></PartnerList> */}
                <Media object src={baseUrl + partner.image} alt={partner.name} width="150" />
                <Media body className="ml-5 mb-4">
                    {/* <CardImg src={baseUrl + partner.image} alt={partner.name} /> */}
                    <Media heading>
                        {partner.name}
                    </Media>
                    {partner.description}
                </Media>
            </React.Fragment>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function PartnerList(partners) {
    console.log("props")
    console.log(partners)
    console.log(partners.partners)
    console.log(partners.partners.partners)
    const partnerss = partners.partners.partners.map(partner => {
        return (
            <Fade in key={partner.id}>
                <Media tag="li">
                    <RenderPartner partner={partner} />
                </Media>
            </Fade>
        );
    });
    if (partners.partners.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (partners.partners.errMess) {
        return (
            <div className="col">
                <h4>{partners.partners.errMess}</h4>
            </div>
        );
    }

    return (
        <div className="col mt-4">
            <Media list>
                <Stagger in>
                    {partnerss}
                </Stagger>
            </Media>
        </div>
    )
}

// function PartnerList({ partners, isLoading, errMess }) {
//     console.log("props")
//     console.log({ partners, isLoading, errMess })
//     if (partners.isLoading) {
//         return <Loading />;
//     }
//     if (partners.errMess) {
//         return <h4>{errMess}</h4>
//     }
//     const partnerss = partners.partners.map(partner => {
//     return (
//         <Media tag="li" key={partner.id}>
//             <RenderPartner partner={partner} />
//         </Media>
//     );
//     });
//     return (
//         <div>
//             {partnerss}
//         </div>
//     )
// }

function About(props) {
    console.log('||||||||||||')
    console.log(props.partners.partners)
    // const partners = props.partners.partners.map(partner => {
    //     return (
    //         <Media tag="li" key={partner.id}>
    //             <RenderPartner partner={partner} />
    //         </Media>
    //     );
    // });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">February 3, 2016</dd>
                                <dt className="col-6">No. of Campsites in 2019</dt>
                                <dd className="col-6">563</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">4388</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">42</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    <Card className="bg-light mt-3">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">I will not follow where the path may lead, but I will go where there is no path, and I will leave a trail.</p>
                                <footer className="blockquote-footer">Muriel Strode,{' '}
                                    <cite title="Source Title">"Wind-Wafted Wild Flowers" -
                                    The Open Court, 1903</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
                <div className="col mt-4">
                    <PartnerList partners={props.partners} />
                    {/* <Media list>
                        {partners}
                    </Media> */}
                </div>

            </div>
        </div>
    );
}

export default About;