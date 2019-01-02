
function groupBy( array , f ){
    var groups = {};
    array.forEach( function( o )
    {
      var group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
    });
    return Object.keys(groups).map( function( group )
    {
      return {
        key: group,
        value: groups[group]
      };
    });
}

const AppHelper = {
    groupBy: groupBy
}

export default AppHelper
