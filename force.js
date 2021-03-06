
var width = 1960,
    height = 1500,
    root;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .size([width, height])
    

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

root = treeData;


// d3.json("readme.json", function(json) {
//   root = json;
//   update();
// });



function update() {
  var nodes = force.nodes(root),
      links = d3.layout.tree(nodes);
  // Restart the force layout.

  force
      .nodes(nodes)
      .links(links)
      // .gravity(.7)
      // .charge(.66)
      .start();


  // Update the links…
  link = link.data(links, function(d) { return d.target.id; });

  // Exit any old links.
  link.exit().remove();

  // Enter any new links.
  link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // Update the nodes…
  node = node.data(nodes)//, function(d) { return d.id; }).style("fill", color)//.append("g").attr("class", "boogs");

  // Exit any old nodes.
  node.exit().remove();

  // Enter any new nodes.
  node.enter().append("g").attr("class", "boogs")

  var boogs = d3.selectAll("g").attr("class", "boogs")

boogs
			.append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return Math.sqrt(d.size) || 14.5; })
      .style("fill", 'orange')
      .on("click", click)
      .call(force.drag)
      
     
  boogs.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "blue")
      .attr("x", function(d) { return d.x; })
     	.attr("y", function(d) { return d.y; })
			.text( function(d) { return d.name });



   
}

// function tick() {
//   link.attr("x1", function(d) { return d.source.x; })
//       .attr("y1", function(d) { return d.source.y; })
//       .attr("x2", function(d) { return d.target.x; })
//       .attr("y2", function(d) { return d.target.y; });

//   node.attr("cx", function(d) { return d.x; })
//       .attr("cy", function(d) { return d.y; });


// }

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

// Toggle children on click.
function click(d) {
  if (!d3.event.defaultPrevented) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update();
  }
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}
//tick();
update();

//update();
