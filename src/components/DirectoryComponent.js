import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDirectoryItem({ campsite }, props) {
    console.log(props.campsites)
    return (
        <Card>
            <Link to={`/directory/${campsite.id}`}>
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}



function Directory(props) { //Directory component is a present.. comp
    console.log('HEHEHEHEHEHE')
    console.log(props.campsites)
    const directory = props.campsites.campsites.map(campsite => {
    console.log('ASASASASASAS')
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });
    console.log('props.campsites1')
console.log(props.campsites)
    if (props.campsites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
        
    }
    console.log('props.campsites2')
console.log(props.campsites)

    if (props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {console.log('props.campsites3')}
                {console.log(props.campsites)}
                {directory}
            </div>
        </div>
    )
}

// class ExampleParentComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             number: 333
//         }
//     }
//     render() {
//         return <ExampleChildComponent number={this.state.number} greetings="Hello World" />
//     }
// }

// class ExampleChildComponent extends Component {
//     render() {
//         console.log(this.props)
//         return <div>{this.props.number} {this.props.greetings} </div>
//     }
// }
export default Directory;