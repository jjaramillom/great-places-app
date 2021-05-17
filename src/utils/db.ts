import * as SQLite from 'expo-sqlite';

import Place from '@app/models/Place';

// creates the db if it is not found
const db = SQLite.openDatabase('places.db');

export const init = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS 
        place (
          id INTEGER PRIMARY KEY, 
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
          );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const insertPlace = ({
  title,
  address,
  imageUri,
  coordinates,
}: Omit<Place, 'id'>): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO
        place (title, imageUri, address, lat, lng )
        VALUES (?, ?, ?, ?, ?);`,
        [
          title,
          imageUri,
          address ?? '',
          coordinates?.latitude ?? 0,
          coordinates?.longitude ?? 0,
        ],
        (_, result) => {
          resolve(result.insertId.toString());
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const getAllPlaces = (): Promise<Place[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        'SELECT * FROM place;',
        [],
        (_, result) => {
          resolve(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ((result.rows as any)?._array as Place[]).map((place) => ({
              ...place,
              id: place.id.toString(), // id from the database comes as a number
            })) ?? []
          );
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const deleteAllPlaces = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        'DELETE FROM place;',
        [],
        (_, result) => {
          resolve();
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};
