var d3 = require("d3");


function closeModal() {
    d3.select("#overlay").style("visibility", "hidden");
    d3.select("#modal").style("visibility", "hidden");
}

function toggleModal() {
    d3.select("#overlay")
        .style("visibility", function(d){ return (d3.select(this).style("visibility")  == "visible" )? "hidden" : "visible"; 
    })
}

function textModal(titleText, mainText, btnText) {
    var modal = d3.select("#modal");
    modal.select("#modalTitle").text(titleText);
    modal.select("#modalText").text(mainText);
    modal.select("#modalButton").text(btnText);
    d3.select("#overlay").style("visibility", "visible");
    modal.style("visibility", "visible");
}

module.exports = {
    show : textModal,
    toggle : toggleModal,
    close : closeModal
}
