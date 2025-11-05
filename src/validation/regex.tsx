// regex.ts

export const NAME_REGEX = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź]+(?:[\s\-'][A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź]+)*$/;
export const PHONE_NUMBER_REGEX = /^\+?[0-9]{9,15}$/;

export const STREET_REGEX = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź0-9\s\-.]+$/;
export const CITY_REGEX = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź\s\-']+$/;
export const ZIP_CODE_REGEX = /^\d{2}-\d{3}$/;
export const BUILDING_REGEX = /^[0-9]+[A-Za-z0-9\/\-]{0,5}$/;
export const APARTMENT_REGEX = /^[0-9]{0,5}$/;
export const COUNTRY_REGEX = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŻżŹź\s\-']+$/;