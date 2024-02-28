import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import BASEURL from '../../config/baseurl';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
const DropdownCreator = () => (
    <>
        {[...Array(6)].map((_, index) => (
            <option key={index} value={index}>{index}</option>
        ))}
    </>
);

const SectionBuild = ({ sectionDetails = [], onEmotionChange }) => (
    <div className="row g-3">
        {sectionDetails.map((section, index) => (
            <div className="col-md-6" key={section.name + index}>
                <label htmlFor={section.property} className="form-label">{section.label}:</label>
                <select className="form-select" property={section.property} id={section.property} name={section.property} onChange={onEmotionChange} required>
                    <DropdownCreator />
                </select>
            </div>
        ))}
    </div>
);



const UrgeForm = ({htmlInfo={},setFormInfo,formInfo, ...props }) => {
    const [hideEngage, setHideEngage] = useState(true);
    const handleOnSelectChange = (e) => {
        setHideEngage(e.target.value == 0)
        let tempFormData= {...formInfo};
        const propertyValue=e.target.attributes.id.value;
        if(!tempFormData?.urges){
            tempFormData["urges"]={}
        }
        if(propertyValue=="otherUrges"){

            tempFormData.urges["other"]={...tempFormData.urges?.other,value:e.target.value};
        }else{

            tempFormData.urges[propertyValue]=e.target.value;
        }
        setFormInfo(tempFormData);
    }
    const handleOnEngageChange= (e)=>{
        let tempFormData= {...formInfo};
        const propertyValue=e.target.attributes.property.value
        if(!tempFormData?.behavior){
            tempFormData["behavior"]={}
        }
        if(propertyValue=="otherUrges"){

            tempFormData.behavior["other"]={value:e.target.value,name:tempFormData.behavior?.other?.name};
        }else{

            tempFormData.behavior[propertyValue]=e.target.value;
        }
        setFormInfo(tempFormData);
    }

    const handleOnTextChange = (e)=>{
        let tempFormData= {...formInfo};
        if(!tempFormData?.behavior){
            tempFormData["behavior"]={}
        }
        if(!tempFormData.behavior["other"]){

            tempFormData.behavior["other"]={name:e.target.value};
        }else{

            tempFormData.behavior.other={...tempFormData.behavior.other,name:e.target.value};
        }
        if(!tempFormData.urges["other"]){

            tempFormData.urges["other"]={name:e.target.value};
        }else{

            tempFormData.urges.other={...tempFormData.urges.other,name:e.target.value};
        }
        setFormInfo(tempFormData);
    }
    return <>
        <div className="row g-3">
            <div className="col-md-6">
                <label htmlFor={htmlInfo.property} className="form-label">{htmlInfo.label}:</label>
                <select className="form-select" id={htmlInfo.property} name={htmlInfo.name} onChange={handleOnSelectChange} required>
                    <DropdownCreator />
                </select>
            </div>
            {!hideEngage && htmlInfo.property==="otherUrges" && <>
            <label htmlFor={`${htmlInfo.property}-specify`} className="form-label">Specify {htmlInfo.label}:</label>
                <input className="form-control"  onChange={handleOnTextChange} id={`${htmlInfo.property}-specify`} name={`${htmlInfo.property}-specify`} required={!hideEngage}/>
                   

            </>}
            {!hideEngage && <div className="col-md-6">
                <label htmlFor={`${htmlInfo.property}-engage`} className="form-label">Did you Engage in {htmlInfo.label}:</label>
                <select className="form-select" id={`${htmlInfo.property}-engage`} property={htmlInfo.property} onChange={handleOnEngageChange} name={`${htmlInfo.property}-engage`} required={!hideEngage}>
                    <option key={"no"} value="false">No</option>
                    <option key={"yes"} value="true">Yes</option>
                </select>
            </div>
            }
            
        </div>
    </>
}

const DbtSkillForm = ({htmlInfo={},formInfo,setFormInfo, ...props }) => {
    
    const [hideRange, setHideRange] = useState(true);
     
     const handleOnSelectChange = (e) => {
        //set effectivenessDbtSkill
        let tempFormData= {...formInfo};
        const propertyValue=e.target.attributes.id.value;
        if(!tempFormData?.effectivenessDbtSkill){
            tempFormData["effectivenessDbtSkill"]={}
        }
        if(propertyValue=="otherSkills"){

            tempFormData.effectivenessDbtSkill["other"]={...tempFormData.effectivenessDbtSkill?.other,value:e.target.value};
        }else{

            tempFormData.effectivenessDbtSkill[propertyValue]=e.target.value;
        }
        setFormInfo(tempFormData);
    }
    const handleOnEngageChange= (e)=>{

        //set dbtSkill
        setHideRange((hideRange)=>!e.target.value);
        let tempFormData= {...formInfo};
        const propertyValue=e.target.attributes.property.value
        if(!tempFormData?.dbtSkill){
            tempFormData["dbtSkill"]={}
        }
        if(propertyValue=="otherSkills"){

            tempFormData.dbtSkill["other"]={value:e.target.value,name:tempFormData.dbtSkill?.other?.name};
        }else{

            tempFormData.dbtSkill[propertyValue]=e.target.value;
        }
        setFormInfo(tempFormData);
    }

    const handleOnTextChange = (e)=>{
        let tempFormData= {...formInfo};
        if(!tempFormData?.effectivenessDbtSkill){
            tempFormData["effectivenessDbtSkill"]={}
        }
        if(!tempFormData.effectivenessDbtSkill["other"]){

            tempFormData.effectivenessDbtSkill["other"]={name:e.target.value};
        }else{

            tempFormData.effectivenessDbtSkill.other={...tempFormData.effectivenessDbtSkill.other,name:e.target.value};
        }
        if(!tempFormData?.dbtSkill["other"]){

            tempFormData.dbtSkill["other"]={name:e.target.value};
        }else{

            tempFormData.dbtSkill.other={...tempFormData.dbtSkill.other,name:e.target.value};
        }
        setFormInfo(tempFormData);
    }
     return <>
         <div className="row g-3">
             
              <div className="col-md-6">
                 <label htmlFor={`${htmlInfo.property}-engage`} className="form-label">Did you Engage in {htmlInfo.label}:</label>
                 <select className="form-select"  property={htmlInfo.property} id={`${htmlInfo.property}-engage`} onChange={handleOnEngageChange} name={`${htmlInfo.property}-engage`} required>
                     <option key={"no"} value="false">No</option>
                     <option key={"yes"} value="true">Yes</option>
                 </select>
             </div>
             {!hideRange && htmlInfo.property==="otherSkills" && <>
            <label htmlFor={`${htmlInfo.property}-specify`} className="form-label">Specify {htmlInfo.label}:</label>
                <input className="form-control"  property={htmlInfo.property} onChange={handleOnTextChange} id={`${htmlInfo.property}-specify`} name={`${htmlInfo.property}-specify`} required={!hideRange}/>
             </>}  

             {!hideRange && 
                <div className="col-md-6">
                 <label htmlFor={htmlInfo.property} className="form-label">{htmlInfo.label}:</label>
                 <select className="form-select" property={htmlInfo.property} id={htmlInfo.property} onChange={handleOnSelectChange} name={htmlInfo.name}  required={!hideRange}>
                     <DropdownCreator />
                 </select>
             </div>
             }
             
         </div>
     </>
 }
const DBTFormComponent = ({taskId,...props}) => {


   
    const [formInfo,setFormInfo]=useState({});
    const formStructure = {
        "emotion": [
            { "name": "anxiety", "property": "anxiety", "label": "Anxiety" },
            { "name": "sadness", "property": "sadness", "label": "Sadness" },
            { "name": "anger", "property": "anger", "label": "Anger" },
            { "name": "shame", "property": "shame_guilt", "label": "Shame/Guilt" },
            { "name": "happiness", "property": "happiness", "label": "Happiness" },
            { "name": "other", "property": "otherEmotion", "label": "Other" }
        ],
        "urges": [
            { "name": "self-harm", "property": "self_harm", "label": "Self-harm" },
            { "name": "substance_use", "property": "substance_use", "label": "Substance use" },
            { "name": "disorder_eating", "property": "disorder_eating", "label": "Disordered eating" },
            { "name": "other", "property": "otherUrges", "label": "Other" }
        ],
        "dbtskills": [
            { "name": "mindfulness", "property": "mindfulness", "label": "Mindfulness" },
            { "name": "distress tollerance", "property": "distressTollerance", "label": "Distress Tollerance" },
            { "name": "emotion regulation", "property": "emotionRegulation", "label": "Emotion Regulation" },
            { "name": "Interpersonal effectiveness", "property": "interpersonalEffectiveness", "label": "Interpersonal Effectiveness" },
            { "name": "other", "property": "otherSkills", "label": "Other" }
        ]
    };
    const {currentUser}=useAuth();
    
  const navigate= useNavigate();
    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        console.log("final",formInfo);
        const updateDBTInfoApi= async ()=>{
           try {
             const {data}=await axios.put(`${BASEURL}/api/dbtquestion/${taskId}`,{answers:formInfo},{headers:{authToken:currentUser.accessToken}});
                console.log(data);
                navigate("/client/dashboard")
           } catch (error) {
            
           }
        } ;
        updateDBTInfoApi();
    }

    const onEmotionChange =(e)=>{
        let tempFormData= {...formInfo};
        const propertyValue=e.target.attributes.property.value;
        if(!tempFormData?.emotional){
            tempFormData["emotional"]={}
        }
        if(propertyValue=="otherEmotion"){

            tempFormData.emotional["other"]={...tempFormData.emotional?.other,value:e.target.value};
        }else{

            tempFormData.emotional[propertyValue]=e.target.value;
        }
        setFormInfo(tempFormData);
    }
    return (
        <div className="container card">
            <h1 className="mt-5 mb-4">Daily Mood and Emotions Tracking</h1>
            <form onSubmit={handleOnSubmit}>
                <h5>Rate each emotion from 0 (not at all) to 5 (extremely):</h5>
                <SectionBuild sectionDetails={formStructure.emotion} onEmotionChange={onEmotionChange}/>

                <h2 className="mt-5">Urges Tracking</h2>
                <h5>Rate each urge from 0 (not at all) to 5 (extremely):</h5>
                    {formStructure.urges.map((section)=><UrgeForm key={section.property} setFormInfo={setFormInfo} formInfo={formInfo}  htmlInfo={section}/>)}


                <h2 className="mt-5">DBT Skills Usage</h2>
                {formStructure.dbtskills.map((section)=><DbtSkillForm key={section.property} setFormInfo={setFormInfo} formInfo={formInfo} htmlInfo={section}/>)}

                <button type="submit" className="btn btn-primary m-4">Submit</button>
            </form>
        </div>
    );
};

export default DBTFormComponent;
