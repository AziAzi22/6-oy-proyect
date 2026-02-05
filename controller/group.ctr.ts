import type { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import type { CreateGroupDto, UpdateGroupDto } from "../dto/group.dto.js";
import { Group } from "../model/association.js";

Group.sync({ force: false });

// get all gruops

export const getAllGroups = async (
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
          { title: { [Op.iLike]: `%${search}%` } },
          { days: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const { count, rows: groups } = await Group.findAndCountAll({
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
      groups,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

/// create group

export const addGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { title, days, time, image_url, added_by, teacher_id } = req.body as CreateGroupDto;

    await Group.create({
      title,
      days,
      time,
      image_url,
      added_by,
      teacher_id
    });

    res.status(201).json({
      message: "Group added successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

/// update group

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const { title, days, time, image_url, added_by, teacher_id } = req.body as UpdateGroupDto;

    const newID = Number(id as string);

    const foundedStaff = await Group.findByPk(newID);

    if (!foundedStaff) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    await Group.update(
      {
        title,
        days,
        time,
        image_url,
        added_by,
        teacher_id
      },
      {
        where: {
          id: newID,
        },
      },
    );

    res.status(201).json({
      message: "Group updated successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete group

export const deleteGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const newID = Number(id as string);

    const foundedGroup = await Group.findByPk(newID);

    if (!foundedGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    await Group.destroy({
      where: {
        id: newID,
      },
    });

    res.status(201).json({
      message: "Group deleted successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
