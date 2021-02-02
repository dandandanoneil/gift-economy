import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import PageTitle from "../components/PageTitle"
import Wrapper from "../components/Wrapper";
import Image from 'react-bootstrap/Image';

function MeetTeam() {
    return (
        <Wrapper>
            <PageTitle>Our Team</PageTitle>
            <div className="row justify-content-md-center text-center">
                <div className="col-lg-3">
                    <Image src="https://avatars.githubusercontent.com/u/69398269?s=400&u=8c5fd9ad3df9263a7587305c05e0a8ae6b75e743&v=4" fluid roundedCircle alt="Dan O'Neil" />
                    <h3 className="mt-3">Dan O'Neil</h3>
                    <a href="https://github.com/dandandanoneil">GitHub Profile</a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum varius odio, eu rhoncus orci tempus non. Phasellus vel leo efficitur, porta ex quis, consequat lectus. Aliquam eget est lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sodales ullamcorper rhoncus. Phasellus dapibus euismod magna, nec tempor tortor elementum vestibulum. Aliquam purus metus, luctus sed nulla mollis, ornare faucibus nunc.</p>
                </div>
                <div className="col-lg-3">
                    <Image src="https://avatars.githubusercontent.com/u/15930792?s=400&u=c989600869b8202c838cc8e044805a5da1c1cfa4&v=4" fluid roundedCircle alt="Luis Canahuate" />
                    <h3 className="mt-3">Luis Canahuate</h3>
                    <a href="https://github.com/canahuate16">GitHub Profile</a>
                    <p>Donec vestibulum at turpis sed mollis. Mauris ultricies justo velit, non malesuada erat ullamcorper id. Quisque pharetra venenatis imperdiet. Praesent eleifend, ligula nec consectetur tincidunt, dui urna lobortis dolor, ac eleifend eros quam non erat. Sed interdum finibus dui eget hendrerit. Phasellus fermentum elit erat, at congue lectus semper non. Curabitur sed risus cursus, gravida est a, viverra dui. Duis sollicitudin sem vel quam blandit, quis euismod justo tristique. Praesent tempus vel lorem nec lobortis. Donec pharetra nunc ut orci commodo dictum. Donec in ante eget ante fringilla gravida.</p>
                </div>
                <div className="col-lg-3">
                    <Image src="https://avatars.githubusercontent.com/u/68611714?s=400&u=55a05137ba0556c73b2def2d0c9c1461f7913598&v=4" fluid roundedCircle alt="Skyler Dakota Lawton" />
                    <h3 className="mt-3">Skyler Dakota Lawton</h3>
                    <a href="https://github.com/skylerdakota">GitHub Profile</a>
                    <p>Pellentesque sit amet nisl sed mauris luctus tristique. Mauris pretium tristique malesuada. Aliquam enim dolor, fermentum et auctor id, tempus sed sapien. Duis condimentum accumsan velit, a ultricies felis vestibulum nec. Maecenas suscipit est a tincidunt sodales. Sed sit amet ante eu nisi tempus dapibus. Duis ultrices augue quis molestie consectetur.</p>
                </div>
            </div>
        </Wrapper>
    );
  }

export default MeetTeam;