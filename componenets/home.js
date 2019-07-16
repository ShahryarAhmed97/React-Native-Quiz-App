
import React, { Component } from 'react'
import { ImageBackground,TextInput, StyleSheet, Text, Modal, View, Alert, TouchableOpacity, TouchableHighlight, Button, Image, FlatList, ScrollView } from 'react-native';
import cover from '../assets/homeCover.jpg'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            quizArr:[],
            quizBool:false,
            index:0,
            ansBool:false,
            ansArr:[],
            ansObj:{},
            resBool:false,
            timer:0,
            home:this.props.home,
            tStr:'',
        

        }

        // this.reQuizFun=this.reQuiz.bind(this)
    }

    

    componentDidMount(){
        fetch('https://opentdb.com/api.php?amount=10')
          .then(response => response.json())
          .then(res => 
            
            this.setState({
                quizArr:res.results,
            })
            )
            // console.log(this.state.quizArr)
    }

    nextQuizFun(){
        const {ansArr,ansBool,quizArr,index,quizBool,ansObj}=this.state

        ansArr.push(ansBool)
        console.log(ansBool)
        this.setState({ansArr:this.state.ansArr,ansBool:false})

         if(index<quizArr.length-1){

             this.setState({index:this.state.index+1})
         }
         else{
             console.log('last question')
             console.log(ansArr)
            let temp=[]
            let wrong=[]
             ansArr.map((val,inx)=>{
                 if(val==true){
                    temp.push(inx+' ,')
                    

                 }
                 else{
                     wrong.push(inx+' ,')

                 }



             })

             console.log('nextwalaTimer',this.state.timer)

             ansObj.corAnsArr=[...temp]
             ansObj.corAns=temp.length
             ansObj.wrongArr=[...wrong]
             ansObj.wrAns=wrong.length
             ansObj.finalAns=(temp.length/10)*100

             let ti=(this.state.timer/60).toString()
             let min=ti.slice(0,ti.indexOf('.'))
             let sec= ti.slice(ti.indexOf('.')+1)
             sec=sec.slice(0,2)
     
           
             if(true){
     
                 
                 ti=min+' min :'+sec+"  sec"
     
                 this.setState({
                     tStr:ti
                 })
                 
                 
     
             }
           


             this.setState({ansObj:this.state.ansObj})

             this.setState({quizBool:false,resBool:true})
         }


    }


    startQuizFun(){
        this.setState({quizBool:true})

        setInterval(()=>{
            this.setState({
                timer:this.state.timer+1
                
            })
            console.log(this.state.timer)
        },1000)
    }

    reQuiz(){
        this.props.reQuizFun()
    }

    
    quizFun(){
        const {quizArr,index}=this.state
    
        return(

            <View style={{flexDirection:"column",alignItems:'center',justifyContent:'space-around',}}>
                
                <View  style={{justifyContent:'space-around',alignContent:'space-around'}} >

                    <Text style={{color:'white',fontSize:20,}}>
                        {quizArr[index].question!==undefined?quizArr[index].question:'Question not found'}
                    </Text>
               
                <Button color='#52ba57'  title={quizArr[index].correct_answer!==undefined?quizArr[index].correct_answer.toString():''} onPress={()=>{this.setState({ansBool:true})}}  />
               
                <Button  color='#52ba57' title={quizArr[index].incorrect_answers[0]!==undefined?quizArr[index].incorrect_answers[0].toString():''} onPress={()=>{this.setState({ansBool:false})}} />
                 
                 
                 <View>
                     {
                         title=quizArr[index].incorrect_answers[1]!==undefined &&

                      <Button   color='#52ba57' title={quizArr[index].incorrect_answers[1]!==undefined?quizArr[index].incorrect_answers[1].toString():''} onPress={()=>{this.setState({ansBool:false})}}  />
                     }
                 </View>
            
            
              <View>
               {
                   title=quizArr[index].incorrect_answers[2]!==undefined &&
                   
               <Button  color='#52ba57' title={quizArr[index].incorrect_answers[2]!==undefined?quizArr[index].incorrect_answers[2].toString():''}  onPress={()=>{this.setState({ansBool:false})}} />
               }
               </View>
          
          
            <Button  color='#52ba57'  title='Next' onPress={()=>this.nextQuizFun()} />

                </View>

                  
            </View>
           
        )

    }

    



    render() {
        return (
            

            
      
        <View >
       {

   !this.state.quizBool && !this.state.resBool &&
   <ImageBackground source={require('../assets/cover4.jpg')} style={{width: '100%', height: '100%'}}>

            <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:'center',}}>
            
             <View>
                  <Text style={{fontSize:36,color:'white',}} >
                    Trivia Quiz App 
                    </Text>
               </View>

              <View>
                    <Button  title="Let's Start" color='#52ba57' height='50' width='50' onPress={()=>this.startQuizFun()}   />

                </View>

            </View>
        </ImageBackground>
        }
        {
             this.state.quizBool && !this.state.resBool &&
             <ImageBackground source={require('../assets/cover4.jpg')} style={{width: '100%', height: '100%'}}>

             <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:'center',}} >
              {this.quizFun()}
              </View>
             </ImageBackground>

        }

        {
            !this.state.quizBool &&  this.state.resBool &&
            <ImageBackground source={require('../assets/cover4.jpg')} style={{width: '100%', height: '100%'}}>

            <View style={{flex:1,flexDirection:"column",alignItems:'center',justifyContent:'center',}}>
                <Text style={{fontSize:36,color:'white'}}>
                    Result
                </Text>
                <Text style={{fontSize:20,color:'white'}}>
                   Total Right Answers : {this.state.ansObj.corAns}
                </Text>
                <Text style={{fontSize:20,color:'white'}}>
                   Total Wrong Answers : {this.state.ansObj.wrAns}
                </Text> 
                <Text style={{fontSize:20,color:'white'}}>
                   Total Time : {this.state.tStr}
                </Text> 
                <Text style={{fontSize:20,color:'white'}}>
                    Right Answers : {
                        this.state.ansObj.corAnsArr.map((val,inx)=>{
                            return(
                                val
                            )

                        })

                    }
                </Text>
                <Text style={{fontSize:20,color:'white'}}>
                    Wrong Answers : {
                        this.state.ansObj.wrongArr.map((val,inx)=>{
                            return(
                                val
                            )

                        })

                    }
                </Text>

                <Text style={{fontSize:20,color:'white'}}>
                  Total Score : {this.state.ansObj.finalAns} %
                </Text>
                

                <Button title='Start again' color='green' onPress={()=>this.reQuiz()} />

            </View>
            </ImageBackground>
        }
        
                
        </View>//MAIN PAGE END HERE 
            
            )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });