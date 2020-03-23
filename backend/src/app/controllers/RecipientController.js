import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      street_number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { recipient_id } = req.params;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    const {
      name,
      street,
      street_number,
      complement,
      state,
      city,
      zip_code,
    } = req.body;

    if (
      !name &&
      !street &&
      !street_number &&
      !complement &&
      !state &&
      !city &&
      !zip_code
    ) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    if (
      await Recipient.findOne({
        where: {
          name,
          street,
          street_number,
          complement,
          state,
          city,
          zip_code,
        },
      })
    ) {
      return res
        .status(400)
        .json({ error: 'A recipient with the same info already exists' });
    }

    const {
      recipientName,
      recipientStreet,
      recipientStreetNumber,
      recipientComplement,
      recipientState,
      recipientCity,
      recipientZipCode,
    } = await recipient.update(req.body);

    return res.json({
      recipientName,
      recipientStreet,
      recipientStreetNumber,
      recipientComplement,
      recipientState,
      recipientCity,
      recipientZipCode,
    });
  }
}

export default new RecipientController();
