define(["Backbone","fiddle_backbone/models/UsedFiddle"],function(e,t){var n=e.Collection.extend({model:t,comparator:function(e,t){return e.get("last_used")==t.get("last_used")?0:e.get("last_used")>t.get("last_used")?-1:1},insert:function(e){if(!$("#user_choices",this).length){var t=this.find(function(t){return t.get("fragment")==e.get("fragment")});t?(t.set("last_used",e.get("last_used")),this.sort()):this.add(e),this.trigger("change")}},initialize:function(){try{if(localStorage){var e=localStorage.getItem("fiddleHistory");e&&e.length&&this.add($.parseJSON(e))}}catch(t){}}});return n})