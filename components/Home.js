import React from 'react'
import './styles/home.css'
import {useState,useEffect} from 'react';
import {Numerology} from '../numerology'

const numberChart=[1,2,3,4,5,8,3,5,1,1,2,3,4,5,7,8,1,2,3,4,6,6,6,5,1,7]
                //[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z]


function Home(){
    const [name,setName]=useState('');
    const [user,setUser]=useState('');

    const [namank,setNamank]=useState(0);
    const [destiny,setDestiny]=useState(0);
    const [soul,setSoul]=useState(0);
    const [dream,setDream]=useState(0);

    const [letRender,setLetRender]=useState(false);

    //reduce the sum of digits till it is a single digit or 11/22/33.
    function reduceSum(n){
        let sum=0;
        const strt = new Date();
        console.log(strt.getTime());
        var end;
        if(n===11||n===22||n===33){
            return n;
        }
        while(n>0 || sum>9){
            if(n<0){            //11,22,33 are master numbers.
                if(sum===11||sum===22||sum===33){
                    return sum;
                }else{
                    n=sum;
                    sum=0;
                }
            }
            sum=sum+n%10;
            n=Math.floor(n/10);
            end = new Date();
            //handle infinite loops
            if(end.getTime()-strt.getTime()>1000){
                return 0;
            }

        }
        return sum;
    }

    function handleSubmit(e){
        e.preventDefault();
        setUser(name);
        if(name.length===1){
           alert('enter name properly!')
        }
        var upper=name.toUpperCase().replaceAll(' ','');
      
        //total sum of alphabet,vowels,consonents
        var totalSum=0,vowelSum=0,consonentSum=0;
        for(let i=0;i<upper.length;i++){        
                
            totalSum=totalSum + numberChart[upper[i].charCodeAt(0)-'A'.charCodeAt(0)];
        
            if(upper[i]==='A'||upper[i]==='E'||upper[i]==='I'||upper[i]==='O'||upper[i]==='U'){
                vowelSum=vowelSum + numberChart[upper[i].charCodeAt(0)-'A'.charCodeAt(0)];
            }else{
                consonentSum=consonentSum + numberChart[upper[i].charCodeAt(0)-'A'.charCodeAt(0)];
            }
        }                                                       
            setNamank(totalSum);
            setDestiny(reduceSum(totalSum));
            setSoul(reduceSum(vowelSum));
            setDream(reduceSum(consonentSum));
        setName('');
    }

function Render(){
    useEffect(() => {
        if(destiny!==0){
            setLetRender(true);
        }
    }, [destiny])
    
    if(letRender){
        return(
        <div className="render">
            <h3>Hi {user}!</h3>
            <p>Compound Name Number(Numerology Total of Your Name)- {namank}</p>
            <h4>Name Destiny/Expression Number or Namanak - {destiny}</h4>
                <p>{Numerology[destiny]}</p>
            <h4>Soul Urge/Heart Desire Number - {soul}</h4>
                <p>{Numerology[soul]}</p>
            <h4>Name Dream/Personality Number - {dream}</h4>
                <p>{Numerology[dream]}</p>
        </div>
        )
    }else{
        return(
            <>
            </>
        )
        }
    }    

    return (
     <div className="home">
        <div className="nav">
            Name Number Numerology
        </div>
        <div className="input-area">
            <form onSubmit={handleSubmit}>
                Enter name: 
                <br/>
                <input 
                    className="input-text" 
                    type="text"
                    name="fname"
                    value={name}
                    placeholder="enter name"
                    required
                    onChange={(e)=>setName(e.target.value)}
                /><br/>
                <div id="center-btn">
                    <button type="submit" className="btn">calculate</button>
                </div>
            </form>    
        </div>
            <Render/>
     </div>
    )
}

export default Home