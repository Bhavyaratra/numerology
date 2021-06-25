import React from 'react'
import './styles/home.css'
import {useState} from 'react';
import {Numerology} from '../numerology'

const numberChart={
    A:1, B:2, C:3, D:4, E:5, F:8, G:3, H:5, I:1, J:1, K:2, L:3, M:4, N:5, O:7, P:8, Q:1, R:2,
    S:3, T:4, U:6, V:6, W:6, X:5, Y:1, Z:7,
    a:1, b:2, c:3, d:4, e:5, f:8, g:3, h:5, i:1, j:1, k:2, l:3, m:4, n:5, o:7, p:8, q:1, r:2,
    s:3, t:4, u:6, v:6, w:6, x:5, y:1, z:7 
}

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
        if(n===11||n===22||n===33){
            return n;
        }
        if(n==0){
            return 0;
        }
        //returns single digit number
        return (n%9==0)? 9 : n%9;
    }

    function handleSubmit(e){
        e.preventDefault();
        setUser(name);
        var letters = /^[A-Za-z]+$/; //regex to check if name contains only string and not numbers
        if(name.length===1){
           setLetRender(false);
           alert('enter name properly!');
           return 0;
        }
        var fname=name.replaceAll(' ','');

        if(fname.match(letters)){
            setLetRender(true);
            //total sum of alphabet,vowels,consonents
            var totalSum=0,vowelSum=0,consonentSum=0;
            fname.split('').map((Char)=>{  
                totalSum=totalSum + numberChart[Char];
                if(Char==='A'||Char==='E'||Char==='I'||Char==='O'||Char==='U'
                    || Char==='a'||Char==='e'||Char==='i'||Char==='o'||Char==='u'){
                    vowelSum=vowelSum + numberChart[Char];
                }
            })     
                consonentSum=totalSum-vowelSum;                                            
                setNamank(totalSum);
                setDestiny(reduceSum(totalSum));
                setSoul(reduceSum(vowelSum));
                setDream(reduceSum(consonentSum));
        }else{
            
            setLetRender(false);

            alert('Enter name properly!');
        }    
        setName('');
    }

function Render(){  
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
            <span></span>
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