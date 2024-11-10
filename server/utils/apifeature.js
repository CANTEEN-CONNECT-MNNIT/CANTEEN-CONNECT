class Apifeature {
  constructor(models, queryobj) {
    this.models = models;
    this.queryobj = queryobj;
  }

  filter() {
    console.log(this.queryobj);
  }

  paginate() {}
}

export default Apifeature;
