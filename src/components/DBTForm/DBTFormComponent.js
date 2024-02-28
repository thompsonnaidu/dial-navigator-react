import React from 'react';

const DropdownCreator = () => (
    <>
        {[...Array(6)].map((_, index) => (
            <option key={index} value={index}>{index}</option>
        ))}
    </>
);

const SectionBuild = ({ sectionDetails = [] }) => (
    <div className="row g-3">
        {sectionDetails.map((section, index) => (
            <div className="col-md-6" key={section.name + index}>
                <label htmlFor={section.property} className="form-label">{section.label}:</label>
                <select className="form-select" id={section.property} name={section.property} required>
                    <DropdownCreator />
                </select>
            </div>
        ))}
    </div>
);

const SectionYesNoBuild = ({ sectionDetails = [] }) => (
    <div className="row g-3">
        {sectionDetails.map((section, index) => (
            <div className="col-md-6" key={section.name + index}>
                <label htmlFor={section.property} className="form-label">{section.label}:</label>
                <select className="form-select" id={section.property} name={section.property} required>
                <option key={"no"} value="false">No</option>
                    <option key={"yes"} value="true">Yes</option>
                   
                </select>
            </div>
        ))}
    </div>
);



const skillUsageForm = () =>{


    return <>
    </>
}
const DBTFormComponent = () => {
    const formStructure = {
        "emotion": [
            {"name": "anxiety", "property": "anxiety", "label": "Anxiety"},
            {"name": "sadness", "property": "sadness", "label": "Sadness"},
            {"name": "anger", "property": "anger", "label": "Anger"},
            {"name": "shame", "property": "shame_guilt", "label": "Shame/Guilt"},
            {"name": "happiness", "property": "happiness", "label": "Happiness"},
            {"name": "other", "property": "otherEmotion", "label": "Other"}
        ],
        "urges": [
            {"name": "self-harm", "property": "self_harm", "label": "Self-harm"},
            {"name": "substance_use", "property": "substance_use", "label": "Substance use"},
            {"name": "disorder_eating", "property": "disorder_eating", "label": "Disordered eating"},
            {"name": "other", "property": "otherUrges", "label": "Other"}
        ],
        "behavior": [
            {"name": "self-harm", "property": "selfHarmBehavior", "label": "Self-harm"},
            {"name": "substance use", "property": "substanceUseBehavior", "label": "Substance use"},
            {"name": "disorder eating", "property": "disorderEatingBehavior", "label": "Disordered eating"},
            {"name": "other", "property": "otherBehavior", "label": "Other"}
        ],
        "dbtskills": [
            {"name": "mindfulness", "property": "mindfulness", "label": "Mindfulness"},
            {"name": "distress tollerance", "property": "distressTollerance", "label": "Distress Tollerance"},
            {"name": "emotion regulation", "property": "emotionRegulation", "label": "Emotion Regulation"},
            {"name": "Interpersonal effectiveness", "property": "interpersonalEffectiveness", "label": "Interpersonal Effectiveness"},
            {"name": "other", "property": "otherSkills", "label": "Other"}
        ],
        "effectiveness":[
            {"name": "mindfulness", "property": "mindfulnessEffectiveness", "label": "Mindfulness"},
            {"name": "distress tollerance", "property": "distressTolleranceEffectiveness", "label": "Distress Tollerance"},
            {"name": "emotion regulation", "property": "emotionRegulationEffectiveness", "label": "Emotion Regulation"},
            {"name": "Interpersonal effectiveness", "property": "interpersonalEffectivenessEffectiveness", "label": "Interpersonal Effectiveness"},
            {"name": "other", "property": "otherSkillsEffectiveness", "label": "Other"}
        ],
    };
    const handleOnSubmit = (event)=>{
        event.preventDefault();
        const data= new FormData(event.target);
        let formData={emotional:{},behavior:{},urges:{},dbtskills:{}}
        data.forEach((value,key)=>{
            if(['anxiety', 'sadness', 'anger', 'shame_guilt', 'happiness', 'otherEmotion'].includes(key)){

                formData["emotional"][key]=value
            }
            else if(['self_harm', 'substance_use', 'disorder_eating', 'otherUrges'].includes(key))
                formData["urges"][key]=value;
            else if(['mindfulness', 'distressTollerance', 'emotionRegulation', 'interpersonalEffectiveness', 'otherSkills'].includes(key))
                formData["dbtskills"][key]=value;
            else if(['selfHarmBehavior', 'substanceUseBehavior', 'disorderEatingBehavior', 'otherBehavior'].includes(key))
                formData["behavior"][key]=value;
            else if(['mindfulnessEffectiveness', 'distressTolleranceEffectiveness', 'emotionRegulationEffectiveness', 'interpersonalEffectivenessEffectiveness', 'otherSkillsEffectiveness'].includes(key))
                formData["effectiveness"][key]=value;
            });
            console.log(formData);
    }
    // return (<>
    //     <div className='container card'>
    //         <form onSubmit={handleOnSubmit}>
    //             <h5>Rate each emotion from 0 (not at all) to 5 (extremely):</h5>
    //             <SectionBuild sectionDetails={formStructure.emotion} />
    //         </form>
    //     </div>
    
    // </>)
    return (
        <div className="container card">
            <h1 className="mt-5 mb-4">Daily Mood and Emotions Tracking</h1>
            <form onSubmit={handleOnSubmit}>
                <h5>Rate each emotion from 0 (not at all) to 5 (extremely):</h5>
                <SectionBuild sectionDetails={formStructure.emotion} />

                <h2 className="mt-5">Urges Tracking</h2>
                <h5>Rate each urge from 0 (not at all) to 5 (extremely):</h5>
                <SectionBuild sectionDetails={formStructure.urges} />

                <h2 className="mt-5">Behavior Tracking</h2>
                <SectionYesNoBuild sectionDetails={formStructure.behavior} />

                <h2 className="mt-5">DBT Skills Usage</h2>
                <div className="row g-3">
                    {formStructure.dbtskills.map((section, index) => (
                        <div className="col-md-6" key={section.name + index}>
                            {section.name !== "other" ? (
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id={section.property} name={section.property} />
                                    <label className="form-check-label" htmlFor={section.property}>{section.label}</label>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id={section.property} name={section.property} />
                                            <label className="form-check-label" htmlFor={section.property}>{section.label}</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="specify" className="form-label">Specify:</label>
                                        <input className="form-control" type="text" id={section.name} name={section.name} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <h2 className="mt-5">Effectiveness of DBT Skills</h2>
                <SectionBuild sectionDetails={formStructure.effectiveness} />

                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default DBTFormComponent;
