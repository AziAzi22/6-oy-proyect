import type { NextFunction, Request, Response } from "express";
import { Student } from "../model/student.model.js";
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js";

Student.sync({ force: false });

// get all student

export const getAllStudnets = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const students = await Student.findAll();

    res.status(200).json(students);
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
    } = req.body as CreateStudentDto;

    await Student.create({
      full_name,
      phone_number,
      profession,
      parent_name,
      parent_phone_number,
      image_url,
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
