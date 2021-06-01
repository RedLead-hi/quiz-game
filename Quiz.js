class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()
    background("red")
    text("result of the quiz",340,50)
    Contestant.getPlayerInfo()
    if (allContestants!==undefined){
      var dp= 230
      for (var plr in allContestants){
        var answer="2"
        if (answer===allContestants[plr].answer)
        fill ("yellow")
        else 
        fill ("lightblue")
        dp+=30
        text (allContestants[plr].name+":"+allContestants[plr].amswer,250,dp)
      }
    }
  }

}
