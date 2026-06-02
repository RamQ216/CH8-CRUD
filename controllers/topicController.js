const topicModel=require("../models/topicModel");

function showHome(req,res){
    //pedimos todos los modelos
    const topics=topicModel.getAlltopics();
    const links=linkModel.getAlltopics();
    //renderizamos y pasmos los temas
    res.render("index",{topics});
}

function createTopic(req,res){
    //del json sacamos title y descripcion
    const{title,description}=req.body;

    //creamos el nuevo tema
    topicModel.createTopic(title,description);
    
    //redireccion a la pagina principal
    res.redirect("/");

};


function showEditForm(req, res){
    //sacamos del parametro el id
    const {id} = req.params;
    //buscamos el tema por id
    const topic = topicModel.getTopicById(id);
    //verificamos que exista
    if(!topic){
        return res.redirect("/");
    }
    //renderizamos y pasamos el tema
    res.render("edit",{ topic });
};

function updateTopic(req,res){
    const {id}= req.params;

    const{title,description}=req.body;

    topicModel.updateTopic(id,title,description);

    res.redirect("/");
};

function deleteTopic(req,res){
    const {id}= req.params;

    topicModel.deleteTopic(id);

    res.redirect("/");

};

function voteTopic(req, res) {
  const { id } = req.params;

  const topic = topicModel.voteTopic(id);

  res.json({ success: true, topic });
}


module.exports = {
  showHome,
  createTopic,
  showEditForm,
  updateTopic,
  deleteTopic,
  voteTopic
};


