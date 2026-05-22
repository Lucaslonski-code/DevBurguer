import * as Yup from 'yup';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    return response.status(201).json({ message: 'Product created' });
  }
}

export default new ProductController();
