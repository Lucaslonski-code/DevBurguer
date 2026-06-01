import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import Users from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [Users, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(){
    this.mongooseConection = mongoose.connect('mongodb://localhost:27017/dev-burguer-api-mongo')
  }
}

export default new Database();
