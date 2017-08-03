
class QueryString {
  stringify(obj: Object): string {
    let qs = [];

    for(let prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        qs.push(`${prop}=${obj[prop]}`);
      }
    }

    return qs.join('&');
  }
}

export var qs = new QueryString();