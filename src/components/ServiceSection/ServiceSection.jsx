import React from "react";
import serviceSect from "./ServiceSection.module.css"
import { serviceInfo } from "./ServiceSectionData";

const ServiceSection = () =>
{
    return (
        <section className={serviceSect.sectionContainer}>

            {serviceInfo.map((item) =>
            {
                return (
                    <div className={serviceSect.serviceDiv} key={item.serviceName}>
                        <img src={item.img} alt="" />
                        <div className={serviceSect.serviceInfo}>
                            <h2>{item.serviceName}</h2>
                            <h3>{item.serviceDescription}</h3>
                        </div>
                    </div>
                )
            })}

        </section>
    );
}

export default ServiceSection;