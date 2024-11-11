class Apifeature {
  constructor(models, queryobj) {
    this.models = models;
    this.queryobj = queryobj;
  }

  filter() {
    console.log(this.queryobj.name);

    this.models = this.models.find({
      name: { $regex: this.queryobj.name, $options: 'i' },
    });
    return this;
  }
}

export default Apifeature;
