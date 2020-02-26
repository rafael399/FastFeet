import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        street_number: req.body.street_number,
        state: req.body.state,
        city: req.body.city,
        zip_code: req.body.zip_code,
      },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
