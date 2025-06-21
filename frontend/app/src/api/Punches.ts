import axios from 'axios';

// 打刻履歴の型定義（必要に応じて修正してください）
export interface PunchRecord {
  n03itm: string;
  n03date: string;
  n03time: string;
  n03syain: string;
  n03kubun: string;
  n03menu: string | null;
  n03id: string;
  n03ts: string;
  n03basyo: string | null;
}

// Axiosインスタンス（ベースURLと共通ヘッダー）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

/**
 * 打刻履歴を取得する
 * @param idm カードIDm
 * @param limit 最大取得件数（デフォルト: 8）
 * @returns PunchRecord配列
 * @throws Error（401なら「利用登録されていないカードです。」）
 */
export async function fetchPunchHistory(idm: string, limit: number = 8): Promise<PunchRecord[]> {
  try {
    const response = await api.get<PunchRecord[]>('/api/timecard/punches', {
      headers: {
        'x-card-idm': idm,
      },
      params: {
        limit: limit,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error('利用登録されていないカードです。');
    }
    if (err.response) {
      throw new Error(`${err.response.status} ${err.response.statusText}`);
    }
    throw new Error(err.message || '不明なエラーが発生しました');
  }
}

// 表示名の変換マップ
const labelMap: { [key: string]: string } = {
  attendance: "出勤",
  leave: "退勤",
  bento: "弁当注文",
};

// 表示名の変換マップ
const menuMap: { [key: string]: string } = {
  bento: "弁当",
  side_dish: "おかず",
  none: "なし",
};

/**
 * レコードを「日付 時刻: ラベル」の形式に整形する
 * @param records JSONデータの配列
 * @returns 整形済み文字列配列
 */
export function formatPunchRecords(records: PunchRecord[]): string[] {
  return records.map((item) => {
    const label = labelMap[item.n03kubun] || item.n03kubun;

    // 弁当注文の場合はメニューを末尾に追加
    const menuSuffix =
      item.n03kubun === 'bento' && item.n03menu
        ? `（${menuMap[item.n03menu]}）`
        : '';

    return `${item.n03date} ${item.n03time}: ${label}${menuSuffix}`;
  });
}