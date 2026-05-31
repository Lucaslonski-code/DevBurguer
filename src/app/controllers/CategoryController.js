import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    const { name } = request.body;
    const { filename } = request.file;

    const existingCategory = await Category.findOne({
      where: {
        name,
      }
    })

    if (existingCategory) {
      return response.status(400).json({ error: 'Category already exists' });
    }
    const newCategory = await Category.create({
      name,
      path: filename,
    });

    return response.status(201).json({ newCategory });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    const { name } = request.body;
    const { id } = request.params;

    let path;
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    await Category.update({
      name,
      path,
    }, {
      where: {
        id,
      }
    });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await Category.findOne({
      where: {
        id,
      },
    });

    if (!category)
      return response.status(404).json({ error: 'category not found' });

    await Category.destroy({where: { id }});

    return response.status(200).json({success: 'Category deleted'})
  }

  async index(_request, response) {
    const categories = await Category.findAll();

    console.log(_request.userId);

    return response.status(200).json({ categories });
  }

}

export default new CategoryController();
