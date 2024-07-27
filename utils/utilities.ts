export class Utilities {
  /**
   * 日本時間で現在時刻を取得
   * @returns {Date} - 日本時間のDate型
   */
  static getJSTDate(): Date {
    const now = new Date()
    const jstString = now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    return new Date(jstString)
  }

  /**
   * 指定された文字列日付を日本時間のDate型に変換
   * 日本時間で00:00:00に設定
   * @param {string} strDate - 変換する文字列日付
   * @returns {Date} - 日本時間のDate型
   */
  static convertStringToDate(strDate: string): Date {
    const date = new Date(strDate)
    console.log('convertStringToDate', date)
    const utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0
    )
    return new Date(utcDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }))
  }

  /**
   * 年/月/日それぞれを受け取り、日本時間のDate型に変換
   * @param {number} year - 年
   * @param {number} month - 月
   * @param {number} day - 日
   * @returns {Date} - 日本時間のDate型
   */
  static convertYMDToDate(year: number, month: number, day: number): Date {
    const date = new Date(year, month, day)
    const jstString = date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    return new Date(jstString)
  }

  /**
   * 日付を受け取り、日本時間で00:00:00に設定し、再変換して返す
   * @param {Date} date - 変換する日付
   * @returns {Date} - 日本時間の00:00:00に設定されたDate型
   */
  static setJSTMidnight(date: Date): Date {
    // 元の日付の年月日を取得
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    // 日本時間の00:00:00に設定
    const jstMidnight = new Date(year, month, day, 0, 0, 0)

    // 日本時間に変換して返す
    const jstString = jstMidnight.toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    })
    return new Date(jstString)
  }
}
