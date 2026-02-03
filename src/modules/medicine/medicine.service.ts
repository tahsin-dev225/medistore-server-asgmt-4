import { Medicine } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const createMedicine = async({
  content,
  customerId,
  medicineId,
}: {
  content: string;
  customerId: string;
  medicineId: string;
}) => {
    const deliveredOrder = await prisma.order.findFirst({
    where: {
      customerId,
      medicineId,
      status: "DELIVERED",
    },
  });

  if (!deliveredOrder) {
    throw new Error(
      "You can only review medicines that you have received"
    );
  }

  const alreadyReviewed = await prisma.review.findFirst({
    where: {
      customerId,
      medicineId,
    },
  });

  if (alreadyReviewed) {
    throw new Error("You already reviewed this product");
  }

  const review = await prisma.review.create({
    data: {
      content,
      customerId,
      medicineId,
    },
  });

  return review;
}

const getSellerMedicines = async (
sellerId : string
) => {
    const andConditions: MedicineWhereInput[] = []


    if (sellerId) {
        andConditions.push({
            sellerId 
        })
    }

    const allPost = await prisma.medicine.findMany({
        where: {
            sellerId
        }
    });

    return {
        data : allPost
    };
};

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

const getManageAllMedicines = async () => {
 
    const allPost = await prisma.medicine.findMany({
        include : {
            _count : {
                select : {review : true}
            }
        }
    });

    return allPost
};

const getMedicineById = async (id: string) => {
  return prisma.medicine.findUnique({
    where: { id },
    include: {
      category: true,
      review : true
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
  getSellerMedicines,
  getAllMedicines,
  getManageAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};

