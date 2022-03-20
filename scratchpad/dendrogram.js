<!DOCTYPE html>
<meta charset="utf-8">
<style>

.node circle {
  fill: #999;
}

.node text {
  font: 10px sans-serif;
}

.node--internal circle {
  fill: #555;
}

.node--internal text {
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
}

.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
}

form {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: absolute;
  left: 10px;
  top: 10px;
}

label {
  display: block;
}

</style>
<form>
  <label><input type="radio" name="mode" value="cluster" checked> Dendrogram</label>
  <label><input type="radio" name="mode" value="tree"> Tree</label>
</form>
<svg width="960" height="2400"></svg>
<script src="//d3js.org/d3.v4.min.js"></script>
<script>

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(40,0)");

var tree = d3.tree()
    .size([height - 400, width - 160]);

var cluster = d3.cluster()
    .size([height, width - 160]);

var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.csv("flare.csv", function(error, data) {
  if (error) throw error;

  var root = stratify(data)
      .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

  cluster(root);

  var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = g.selectAll(".node")
      .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("circle")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });

  d3.selectAll("input")
      .on("change", changed);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"tree\"]")
        .property("checked", true)
        .dispatch("change");
  }, 1000);

  function changed() {
    timeout = clearTimeout(timeout);
    (this.value === "tree" ? tree : cluster)(root);
    var t = d3.transition().duration(750);
    node.transition(t).attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
    link.transition(t).attr("d", diagonal);
  }
});

function diagonal(d) {
  return "M" + d.y + "," + d.x
      + "C" + (d.parent.y + 100) + "," + d.x
      + " " + (d.parent.y + 100) + "," + d.parent.x
      + " " + d.parent.y + "," + d.parent.x;
}

</script>
flare.csv#
id,value
flare,
flare.analytics,
flare.analytics.cluster,
flare.analytics.cluster.AgglomerativeCluster,3938
flare.analytics.cluster.CommunityStructure,3812
flare.analytics.cluster.HierarchicalCluster,6714
flare.analytics.cluster.MergeEdge,743
flare.analytics.graph,
flare.analytics.graph.BetweennessCentrality,3534
flare.analytics.graph.LinkDistance,5731
flare.analytics.graph.MaxFlowMinCut,7840
flare.analytics.graph.ShortestPaths,5914
flare.analytics.graph.SpanningTree,3416
flare.analytics.optimization,
flare.analytics.optimization.AspectRatioBanker,7074
flare.animate,
flare.animate.Easing,17010
flare.animate.FunctionSequence,5842
flare.animate.interpolate,
flare.animate.interpolate.ArrayInterpolator,1983
flare.animate.interpolate.ColorInterpolator,2047
flare.animate.interpolate.DateInterpolator,1375
flare.animate.interpolate.Interpolator,8746
flare.animate.interpolate.MatrixInterpolator,2202
flare.animate.interpolate.NumberInterpolator,1382
flare.animate.interpolate.ObjectInterpolator,1629
flare.animate.interpolate.PointInterpolator,1675
flare.animate.interpolate.RectangleInterpolator,2042
flare.animate.ISchedulable,1041
flare.animate.Parallel,5176
flare.animate.Pause,449
flare.animate.Scheduler,5593
flare.animate.Sequence,5534
flare.animate.Transition,9201
flare.animate.Transitioner,19975
flare.animate.TransitionEvent,1116
flare.animate.Tween,6006
flare.data,
flare.data.converters,
flare.data.converters.Converters,721
flare.data.converters.DelimitedTextConverter,4294
flare.data.converters.GraphMLConverter,9800
flare.data.converters.IDataConverter,1314
flare.data.converters.JSONConverter,2220
flare.data.DataField,1759
flare.data.DataSchema,2165
flare.data.DataSet,586
flare.data.DataSource,3331
flare.data.DataTable,772
flare.data.DataUtil,3322
flare.display,
flare.display.DirtySprite,8833
flare.display.LineSprite,1732
flare.display.RectSprite,3623
flare.display.TextSprite,10066
flare.flex,
flare.flex.FlareVis,4116
flare.physics,
flare.physics.DragForce,1082
flare.physics.GravityForce,1336
flare.physics.IForce,319
flare.physics.NBodyForce,10498
flare.physics.Particle,2822
flare.physics.Simulation,9983
flare.physics.Spring,2213
flare.physics.SpringForce,1681
flare.query,
flare.query.AggregateExpression,1616
flare.query.And,1027
flare.query.Arithmetic,3891
flare.query.Average,891
flare.query.BinaryExpression,2893
flare.query.Comparison,5103
flare.query.CompositeExpression,3677
flare.query.Count,781
flare.query.DateUtil,4141
flare.query.Distinct,933
flare.query.Expression,5130
flare.query.ExpressionIterator,3617
flare.query.Fn,3240
flare.query.If,2732
flare.query.IsA,2039
flare.query.Literal,1214
flare.query.Match,3748
flare.query.Maximum,843
flare.query.methods,
flare.query.methods.add,593
flare.query.methods.and,330
flare.query.methods.average,287
flare.query.methods.count,277
flare.query.methods.distinct,292
flare.query.methods.div,595
flare.query.methods.eq,594
flare.query.methods.fn,460
flare.query.methods.gt,603
flare.query.methods.gte,625
flare.query.methods.iff,748
flare.query.methods.isa,461
flare.query.methods.lt,597
flare.query.methods.lte,619
flare.query.methods.max,283
flare.query.methods.min,283
flare.query.methods.mod,591
flare.query.methods.mul,603
flare.query.methods.neq,599
flare.query.methods.not,386
flare.query.methods.or,323
flare.query.methods.orderby,307
flare.query.methods.range,772
flare.query.methods.select,296
flare.query.methods.stddev,363
flare.query.methods.sub,600
flare.query.methods.sum,280
flare.query.methods.update,307
flare.query.methods.variance,335
flare.query.methods.where,299
flare.query.methods.xor,354
flare.query.methods._,264
flare.query.Minimum,843
flare.query.Not,1554
flare.query.Or,970
flare.query.Query,13896
flare.query.Range,1594
flare.query.StringUtil,4130
flare.query.Sum,791
flare.query.Variable,1124
flare.query.Variance,1876
flare.query.Xor,1101
flare.scale,
flare.scale.IScaleMap,2105
flare.scale.LinearScale,1316
flare.scale.LogScale,3151
flare.scale.OrdinalScale,3770
flare.scale.QuantileScale,2435
flare.scale.QuantitativeScale,4839
flare.scale.RootScale,1756
flare.scale.Scale,4268
flare.scale.ScaleType,1821
flare.scale.TimeScale,5833
flare.util,
flare.util.Arrays,8258
flare.util.Colors,10001
flare.util.Dates,8217
flare.util.Displays,12555
flare.util.Filter,2324
flare.util.Geometry,10993
flare.util.heap,
flare.util.heap.FibonacciHeap,9354
flare.util.heap.HeapNode,1233
flare.util.IEvaluable,335
flare.util.IPredicate,383
flare.util.IValueProxy,874
flare.util.math,
flare.util.math.DenseMatrix,3165
flare.util.math.IMatrix,2815
flare.util.math.SparseMatrix,3366
flare.util.Maths,17705
flare.util.Orientation,1486
flare.util.palette,
flare.util.palette.ColorPalette,6367
flare.util.palette.Palette,1229
flare.util.palette.ShapePalette,2059
flare.util.palette.SizePalette,2291
flare.util.Property,5559
flare.util.Shapes,19118
flare.util.Sort,6887
flare.util.Stats,6557
flare.util.Strings,22026
flare.vis,
flare.vis.axis,
flare.vis.axis.Axes,1302
flare.vis.axis.Axis,24593
flare.vis.axis.AxisGridLine,652
flare.vis.axis.AxisLabel,636
flare.vis.axis.CartesianAxes,6703
flare.vis.controls,
flare.vis.controls.AnchorControl,2138
flare.vis.controls.ClickControl,3824
flare.vis.controls.Control,1353
flare.vis.controls.ControlList,4665
flare.vis.controls.DragControl,2649
flare.vis.controls.ExpandControl,2832
flare.vis.controls.HoverControl,4896
flare.vis.controls.IControl,763
flare.vis.controls.PanZoomControl,5222
flare.vis.controls.SelectionControl,7862
flare.vis.controls.TooltipControl,8435
flare.vis.data,
flare.vis.data.Data,20544
flare.vis.data.DataList,19788
flare.vis.data.DataSprite,10349
flare.vis.data.EdgeSprite,3301
flare.vis.data.NodeSprite,19382
flare.vis.data.render,
flare.vis.data.render.ArrowType,698
flare.vis.data.render.EdgeRenderer,5569
flare.vis.data.render.IRenderer,353
flare.vis.data.render.ShapeRenderer,2247
flare.vis.data.ScaleBinding,11275
flare.vis.data.Tree,7147
flare.vis.data.TreeBuilder,9930
flare.vis.events,
flare.vis.events.DataEvent,2313
flare.vis.events.SelectionEvent,1880
flare.vis.events.TooltipEvent,1701
flare.vis.events.VisualizationEvent,1117
flare.vis.legend,
flare.vis.legend.Legend,20859
flare.vis.legend.LegendItem,4614
flare.vis.legend.LegendRange,10530
flare.vis.operator,
flare.vis.operator.distortion,
flare.vis.operator.distortion.BifocalDistortion,4461
flare.vis.operator.distortion.Distortion,6314
flare.vis.operator.distortion.FisheyeDistortion,3444
flare.vis.operator.encoder,
flare.vis.operator.encoder.ColorEncoder,3179
flare.vis.operator.encoder.Encoder,4060
flare.vis.operator.encoder.PropertyEncoder,4138
flare.vis.operator.encoder.ShapeEncoder,1690
flare.vis.operator.encoder.SizeEncoder,1830
flare.vis.operator.filter,
flare.vis.operator.filter.FisheyeTreeFilter,5219
flare.vis.operator.filter.GraphDistanceFilter,3165
flare.vis.operator.filter.VisibilityFilter,3509
flare.vis.operator.IOperator,1286
flare.vis.operator.label,
flare.vis.operator.label.Labeler,9956
flare.vis.operator.label.RadialLabeler,3899
flare.vis.operator.label.StackedAreaLabeler,3202
flare.vis.operator.layout,
flare.vis.operator.layout.AxisLayout,6725
flare.vis.operator.layout.BundledEdgeRouter,3727
flare.vis.operator.layout.CircleLayout,9317
flare.vis.operator.layout.CirclePackingLayout,12003
flare.vis.operator.layout.DendrogramLayout,4853
flare.vis.operator.layout.ForceDirectedLayout,8411
flare.vis.operator.layout.IcicleTreeLayout,4864
flare.vis.operator.layout.IndentedTreeLayout,3174
flare.vis.operator.layout.Layout,7881
flare.vis.operator.layout.NodeLinkTreeLayout,12870
flare.vis.operator.layout.PieLayout,2728
flare.vis.operator.layout.RadialTreeLayout,12348
flare.vis.operator.layout.RandomLayout,870
flare.vis.operator.layout.StackedAreaLayout,9121
flare.vis.operator.layout.TreeMapLayout,9191
flare.vis.operator.Operator,2490
flare.vis.operator.OperatorList,5248
flare.vis.operator.OperatorSequence,4190
flare.vis.operator.OperatorSwitch,2581
flare.vis.operator.SortOperator,2023
flare.vis.Visualization,16540