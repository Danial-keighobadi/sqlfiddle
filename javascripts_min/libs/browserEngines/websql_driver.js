define(["jQuery","BrowserEngines/sqlite_driver"],function(e,t){var n=function(){return this.db=null,this.ddl=[],this.nativeSQLite=window.openDatabase!==undefined,this};return e.extend(n.prototype,t.prototype),n.prototype.buildSchema=function(e){var t=this;try{t.nativeSQLite?(t.db=openDatabase(e.short_code,"1.0",e.short_code,e.ddl.length*1024),t.db.transaction(function(n){var r=t.splitStatement(e.ddl,e.statement_separator);t.ddl=r;var i=0,s=r[i],o=function(t,a){if(i<r.length-1){do i++,s=r[i];while(i<r.length-1&&s.match(/^\s*$/));s.match(/^\s*$/)?(n.executeSql("intentional failure used to rollback transaction"),e.success()):n.executeSql(s,[],o,u)}else n.executeSql("intentional failure used to rollback transaction"),e.success()},u=function(t,n){return n.message!="not an error"?e.error(n.message):e.success(),!0};s?n.executeSql(s,[],o,u):e.success()})):e.error("SQLite (WebSQL) not available in your browser. Try either using a webkit-based browser (such as Safari or Chrome) or using the SQLite (SQL.js) database type.")}catch(n){e.error(n)}},n.prototype.executeQuery=function(t){var n=this;try{if(n.db==null)throw"You need to build the schema before you can run a query.";var r=[];n.db.transaction(function(i){var s=function(e,u){var a={SUCCEEDED:!0,EXECUTIONTIME:new Date-p,RESULTS:{COLUMNS:[],DATA:[]},EXECUTIONPLAN:{COLUMNS:[],DATA:[]}};for(var f=0;f<u.rows.length;f++){var d=[],v=u.rows.item(f);if(f==0)for(col in v)a.RESULTS.COLUMNS.push(col);for(var m=0;m<a.RESULTS.COLUMNS.length;m++)d.push(v[a.RESULTS.COLUMNS[m]]);a.RESULTS.DATA.push(d)}i.executeSql("EXPLAIN QUERY PLAN "+h,[],function(e,u){for(var f=0;f<u.rows.length;f++){var p=[],d=u.rows.item(f);if(f==0)for(col in d)a.EXECUTIONPLAN.COLUMNS.push(col);for(var v=0;v<a.EXECUTIONPLAN.COLUMNS.length;v++)p.push(d[a.EXECUTIONPLAN.COLUMNS[v]]);a.EXECUTIONPLAN.DATA.push(p)}c>n.ddl.length-1&&r.push(a);if(c<l.length-1){do c++,h=l[c];while(c<l.length-1&&h.match(/^\s*$/));h.match(/^\s*$/)?(i.executeSql("intentional failure used to rollback transaction"),t.success(r)):i.executeSql(h,[],s,o)}else i.executeSql("intentional failure used to rollback transaction"),t.success(r)},function(e,u){c>n.ddl.length-1&&r.push(a);if(c<l.length-1){do c++,h=l[c];while(c<l.length-1&&h.match(/^\s*$/));h.match(/^\s*$/)?(i.executeSql("intentional failure used to rollback transaction"),t.success(r)):i.executeSql(h,[],s,o)}else i.executeSql("intentional failure used to rollback transaction"),t.success(r)})},o=function(e,n){if(n.message!="not an error"){var i={SUCCEEDED:!1,EXECUTIONTIME:new Date-p,ERRORMESSAGE:n.message};r.push(i)}return t.success(r),!0},u=[],a,f=!1,l=n.ddl.slice(0);e.each(n.splitStatement(t.sql,t.statement_separator),function(e,t){l.push(t)});var c=0,h=l[c],p=new Date;i.executeSql(h,[],s,o)})}catch(i){t.error(i)}},n})