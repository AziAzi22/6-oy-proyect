import type { NextFunction, Request, Response } from "express";
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js";
import { Op } from "sequelize";
import sequelize from "../config/config.js";
import { Student } from "../model/association.js";

Student.sync({ force: false });

// get all student

export const getAllStudnets = async (
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
          { parent_name: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const { count, rows: students } = await Student.findAndCountAll({
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
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get statistics

export const statistics = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const stat = await Student.findAll({
      attributes: [
        [sequelize.literal(`DATE_TRUNC('month', "joinedAt")`), "month"],
        [sequelize.fn("COUNT", sequelize.col("id")), "totalJoined"],
        [
          sequelize.literal(
            `SUM(case when "leftAt" is not null then 1 else 0 end)`,
          ),
          "totalLeft",
        ],
      ],
      group: [sequelize.literal(`DATE_TRUNC('month', 'joinedAt')`)] as any,
      order: [
        [sequelize.literal(`DATE_TRUNC('month', 'joinedAt')`)],
        "ASC",
      ] as any,
      raw: true,
    });

    res.status(200).json(stat);
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

/// create student

export const addStudnet = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const {
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_phone_number,
      image_url,
      added_by,
      group_id,
    } = req.body as CreateStudentDto;

    await Student.create({
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_phone_number,
      image_url,
      joinedAt: new Date(),
      added_by,
      group_id,
    });

    res.status(201).json({
      message: "Student added successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// left student

export const leftStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const newID = Number(id as string);

    const foundedStudent = await Student.findByPk(newID);

    if (!foundedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.update(
      {
        leftAt: new Date(),
      },
      {
        where: {
          id: newID,
        },
      },
    );

    res.status(201).json({
      message: "left student",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

/// update student

export const updateStudnet = async (
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
      parent_name,
      parent_phone_number,
      image_url,
      leftAt,
      joinedAt,
      added_by,
      group_id,
    } = req.body as UpdateStudentDto;

    const newID = Number(id as string);

    const foundedStudent = await Student.findByPk(newID);

    if (!foundedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.update(
      {
        full_name,
        phone_number,
        profession,
        parent_name,
        parent_phone_number,
        image_url,
        leftAt,
        joinedAt,
        added_by,
        group_id,
      },
      {
        where: {
          id: newID,
        },
      },
    );

    res.status(201).json({
      message: "Student updated successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete student

export const deleteStudnet = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const newID = Number(id as string);

    const foundedStudent = await Student.findByPk(newID);

    if (!foundedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await Student.destroy({
      where: {
        id: newID,
      },
    });

    res.status(201).json({
      message: "Student deleted successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
