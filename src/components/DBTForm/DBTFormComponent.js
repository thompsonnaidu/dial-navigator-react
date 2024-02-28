import React, { useState } from 'react';

const DropdownCreator = () => {
    return (
        <>
            {[...Array(6)].map((_, index) => (
                <option key={index} value={index}>{index}</option>
            ))}
        </>
    );
};

const SectionBuild = ({ sectionDetails = [], sectionHeader }) => {
    return (
        <>
            <div className="row g-3">
                {sectionDetails.map((section, index) => (
                    <div className="col-md-6" key={`${sectionHeader}_${section}_${index}`}>
                        <label htmlFor={`${sectionHeader}_${section}_${index}`} className="form-label">{section}:</label>
                        <select className="form-select" id={`${sectionHeader}_${section}_${index}`} name={`${sectionHeader}_${section}_${index}`} required>
                            <DropdownCreator />
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
};

const SectionYesNoBuild = ({ sectionDetails = [], sectionHeader }) => {
    return (
        <>
            <div className="row g-3">
                {sectionDetails.map((section, index) => (
                    <div className="col-md-6" key={`${sectionHeader}_${section}_${index}`}>
                        <label htmlFor={`${sectionHeader}_${section}_${index}`} className="form-label">{section}:</label>
                        <select className="form-select" id={`${sectionHeader}_${section}_${index}`} name={`${sectionHeader}_${section}_${index}`} required>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
};

const DBTFormComponent = () => {
    const formStructure = {
        "emotion": ["Anxiety", "Sadness", "Anger", "Shame", "Happiness", "Other"],
        "urges": ["Self-harm", "Substance use", "Disorder eating", "Other"],
        "behavior": ["Self-harm", "Substance use", "Disorder eating", "Other"],
        "dbtskills": ["Mindfulness", "Distress tollerance", "Emotion regulation", "Interpersonal effectiveness", "Other"]
    };

    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formValues = {};
        data.forEach((value, key) => {
            formValues[key] = value;
        });
        setFormData(formValues);
        console.log(formValues); // You can perform further actions with the form data here
    };

    return (
        <div className="container card">
            <h1 className="mt-5 mb-4">Daily Mood and Emotions Tracking</h1>
            <form onSubmit={handleSubmit}>
                <h5>Rate each emotion from 0 (not at all) to 5 (extremely):</h5>
                <SectionBuild sectionDetails={formStructure.emotion} sectionHeader="emotion" />
                <h2 className="mt-5">Urges Tracking</h2>
                <h5>Rate each urge from 0 (not at all) to 5 (extremely):</h5>
                <SectionBuild sectionDetails={formStructure.urges} sectionHeader="urges" />
                <h2 className="mt-5">Behavior Tracking</h2>
                <SectionYesNoBuild sectionDetails={formStructure.behavior} sectionHeader="behavior" />
                <h2 className="mt-5">DBT Skills Usage</h2>
                <div className="row g-3">
                    {formStructure.dbtskills.map((section, index) => (
                        <div className="col-md-6" key={`${section}_${index}`}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id={`${section}_${index}`} name={`${section}_${index}`} />
                                <label className="form-check-label" htmlFor={`${section}_${index}`}>{section}</label>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="mt-5">Effectiveness of DBT Skills</h2>
                <SectionBuild sectionDetails={formStructure.dbtskills} sectionHeader="effectiveness" />
                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default DBTFormComponent;

// import React from 'react';

// const DropdownCreator = () => <>
//     {[...Array(6)].map((_, index) => (
//         <option key={index} value={index}>{index}</option>
//     ))}
// </>

// const SectionBuild = ({ sectionDetails = [], ...props }) => {
//     return <>
//         <div className="row g-3">
//             {sectionDetails.map((section, index) => {
//                 return <>

//                     {section != "other" ? <div className="col-md-6" key={section + index}>
//                         <label htmlFor={section} className="form-label">{section}:</label>
//                         <select className="form-select" id={section} name={section} required>
//                             <DropdownCreator />
//                         </select>
//                     </div> : <>

//                         <div className="col-md-6" key={section + index}>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <label htmlFor={section} className="form-label">{section}:</label>
//                                     <input className="form-control" type='text' id={section} name={section} />

//                                 </div>
//                                 <div className='col-md-6'>

//                                     <label htmlFor={section + "rating"} className="form-label">{section + " Rating"}:</label>
//                                     <select className="form-select" id={section + "rating"} name={section + "rating"} required>
//                                         <DropdownCreator />
//                                     </select>
//                                 </div>
//                             </div>

//                         </div>
//                     </>
//                     }
//                 </>
//             })}

//         </div>
//     </>
// }

// const SectionYesNoBuild = ({ sectionDetails = [], ...props }) => {
//     return <>
//         <div className="row g-3">
//             {sectionDetails.map((section, index) => {
//                 return <>

//                     {section != "other" ? <div className="col-md-6" key={section + index}>
//                         <label htmlFor={section} className="form-label">{section}:</label>
//                         <select className="form-select" id={section} name={section} required>
//                                     <option key={index} value="true">yes</option>
//                                     <option key={index} value="false">No</option>
//                         </select>
//                     </div> : <>

//                         <div className="col-md-6" key={section + index}>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <label htmlFor={section} className="form-label">{section}:</label>
//                                     <input className="form-control" type='text' id={section} name={section} />

//                                 </div>
//                                 <div className='col-md-6'>

//                                     <label htmlFor={section + "rating"} className="form-label">{section + " Rating"}:</label>
//                                     <select className="form-select" id={section + "Yes/No"} name={section + "rating"} required>
//                                     <option key={index} value="true">yes</option>
//                                     <option key={index} value="false">No</option>
//                                     </select>
//                                 </div>
//                             </div>

//                         </div>
//                     </>
//                     }
//                 </>
//             })}

//         </div>
//     </>
// }

// const DBTFormComponent = () => {

//     const formStructure = {
//         "emotion": ["anxiety", "sadness", "anger", "shame", "happiness", "other"],
//         "urges": ["self-harm", "substance use", "disorder eating", "other"],
//         "behavior": ["self-harm", "substance use", "disorder eating", "other"],
//         "dbtskills": ["mindfulness", "distress tollerance", "emotion regulation", "Interpersonal effectiveness", "other"]
//     }
//     return (
//         <div className="container card">
//             <h1 className="mt-5 mb-4">Daily Mood and Emotions Tracking</h1>
//             <form action="/submit" method="POST">
//                 <h5>Rate each emotion from 0 (not at all) to 5 (extremely):</h5>
//                 <div className="row g-3">
//                     <SectionBuild sectionDetails={formStructure.emotion}></SectionBuild>
//                 </div>

//                 <h2 className="mt-5">Urges Tracking</h2>

//                 <h5>Rate each urges from 0 (not at all) to 5 (extremely):</h5>
//                 <div className="row g-3">
//                     <SectionBuild sectionDetails={formStructure.urges}></SectionBuild>
//                 </div>

//                 <h2 className="mt-5">Behavior Tracking</h2>
//                 <div className="row g-3">
                   
//                     <SectionYesNoBuild sectionDetails={formStructure.behavior}></SectionYesNoBuild>
//                 </div>

//                 <h2 className="mt-5">DBT Skills Usage</h2>
//                 <div className="row g-3">
//                     {formStructure.dbtskills.map((section, index) => {
//                         return <>
//                             {section !== "other" ? <div className="col-md-6">
//                                 <div className="form-check">
//                                     <input className="form-check-input" type="checkbox" id={section + index} name={section + index} />
//                                     <label className="form-check-label" htmlFor={section + index}>{section}</label>
//                                 </div>
//                             </div> : <>

//                                 <div className='col-md-6'>
//                                     <div className='row'>
//                                         <div className='col-md-2'>
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" id={section + index} name={section + index} />
//                                                 <label className="form-check-label" htmlFor={section + index}>{section}</label>
//                                             </div>
//                                         </div>
//                                         <div className='col-md-10'>
//                                             <label htmlFor={"specify"} className="form-label">{"specify"}:</label>
//                                             <input className="form-control" type='text' id={section} name={section} />

//                                         </div>
//                                     </div>
//                                 </div>
//                             </>}
//                         </>
//                     })}

//                 </div>

//                 <h2 className="mt-5">Effectiveness of DBT Skills</h2>
//                 <div className="row g-3">
//                     <SectionBuild sectionDetails={formStructure.dbtskills}></SectionBuild>
//                 </div>

//                 <button type="submit" className="btn btn-primary mt-4">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default DBTFormComponent;