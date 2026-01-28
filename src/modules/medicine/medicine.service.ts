import { Medicine } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const createMedicine = async (data : Omit<Medicine,'id' | 'createdAt' | 'updatedAt' | 'sellerId'>,sellerId : string) => {
   const result = await prisma.medicine.create({
    data : {
      ...data,
      sellerId
    }
   })
   return result;
}

const getAllMedicines = async ({
    search,
    sellerId,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
}: {
    search: string | undefined,
    sellerId: string | undefined,
    page : number,
    limit : number,
    skip : number,
    sortBy : string,
    sortOrder : string 
}) => {
    const andConditions: MedicineWhereInput[] = []

    if (search) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
            ]
        })
    }


    if (sellerId) {
        andConditions.push({
            sellerId 
        })
    }

    const allPost = await prisma.medicine.findMany({
      take : limit,
      skip,
        where: {
            AND: andConditions
        },
        orderBy : {
          [sortBy] : sortOrder
        },
        include : {
            _count : {
                select : {review : true}
            }
        }
    });

    const total = await prisma.medicine.count({
        where: {
            AND: andConditions
        }
    })
    return {
        data : allPost,
        pagination : {
            total,
            page,
            limit,
            totalPage : Math.ceil(total / limit)
        }
    };
};

const getMedicineById = async (id: string) => {
  return prisma.medicine.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

const updateMedicine = async (id: string, data: Partial<Medicine>) => {
  return prisma.medicine.update({
    where: { id },
    data,
  });
};

const deleteMedicine = async (id: string) => {
  return prisma.medicine.delete({
    where: { id },
  });
};

export const MedicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};

