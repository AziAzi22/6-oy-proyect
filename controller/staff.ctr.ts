import type { NextFunction, Request, Response } from "express";
import { Op } from "sequelize"; 
import type { CreateStaffDto, UpdateStaffDto } from "../dto/staff.dto.js";
import { Staff } from "../model/association.js";

Staff.sync({ force: false });

// get all student

export const getAllStaffs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const page = parseInt(req.query.page as string) | 1;

    const limit = parseInt(req.query.limit as string) | 1;

    const offset = (page - 1) * limit;

    const search = (req.query.search as string)?.trim() || "";

    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { phone_number: { [Op.iLike]: `%${search}%` } },
          { profession: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const { count, rows: staffs } = await Staff.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      raw: true,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      totalPage,
      prev: page > 1 ? { page: page - 1, limit } : undefined,
      next: totalPage > page ? { page: page + 1, limit } : undefined,
      staffs,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};



/// create student

export const addStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const {
      full_name,
      phone_number,
      profession,
      image_url,
    } = req.body as CreateStaffDto;

    await Staff.create({
      full_name,
      phone_number,
      profession,
      image_url,
    });

    res.status(201).json({
      message: "Staff added successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};


/// update staff

export const updateStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const {
      full_name,
      phone_number,
      profession,
      image_url,
    } = req.body as UpdateStaffDto;

    const newID = Number(id as string);

    const foundedStaff = await Staff.findByPk(newID);

    if (!foundedStaff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    await Staff.update(
      {
        full_name,
        phone_number,
        profession,
        image_url,
      },
      {
        where: {
          id: newID,
        },
      },
    );

    res.status(201).json({
      message: "Staff updated successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete staff

export const deleteStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const newID = Number(id as string);

    const foundedStaff = await Staff.findByPk(newID);

    if (!foundedStaff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    await Staff.destroy({
      where: {
        id: newID,
      },
    });

    res.status(201).json({
      message: "Staff deleted successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
