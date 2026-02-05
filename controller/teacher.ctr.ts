import type { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import type { CreateTeacherDto, UpdateTeacherDto } from "../dto/teacher.dto.js";
import { Teacher } from "../model/association.js";

Teacher.sync({ force: false });

// get all teachers

export const getAllTeachers = async (
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

    const { count, rows: teachers } = await Teacher.findAndCountAll({
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
      teachers,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

/// create teacher

export const addTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { full_name, phone_number, profession, image_url, added_by } =
      req.body as CreateTeacherDto;

    await Teacher.create({
      full_name,
      phone_number,
      profession,
      image_url,
      added_by,
    });

    res.status(201).json({
      message: "teacher added successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

/// update teacher

export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const { full_name, phone_number, profession, image_url, added_by } =
      req.body as UpdateTeacherDto;

    const newID = Number(id as string);

    const foundedTeacher = await Teacher.findByPk(newID);

    if (!foundedTeacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    await Teacher.update(
      {
        full_name,
        phone_number,
        profession,
        image_url,
        added_by,
      },
      {
        where: {
          id: newID,
        },
      },
    );

    res.status(201).json({
      message: "Teacher updated successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete teacher

export const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const newID = Number(id as string);

    const foundedTeacher = await Teacher.findByPk(newID);

    if (!foundedTeacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    await Teacher.destroy({
      where: {
        id: newID,
      },
    });

    res.status(201).json({
      message: "Teacher deleted successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
