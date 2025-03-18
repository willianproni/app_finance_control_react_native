import api from './api';

type GetList = {
  year: number;
  month: number;
};

export async function GetList({year, month}: GetList) {
  try {
    const response = await api.get(`/api/releaselisting/v1`, {});
    return {
      status: response.status,
    };
  } catch (error) {
    return {
      data: {},
      status: error,
    };
  }
}
