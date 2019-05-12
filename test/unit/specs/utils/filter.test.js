import filter from '@/utils/filter.js'
const {
    moneySplit,
    secondTrans,
    fixedTwo
} = filter
describe('@/utils/filter.js', () => {
    describe('func moneySplit()', () => {
        it('1000 => 1,000 (int and number)', () => {
            expect(moneySplit(1000)).toBe('1,000')
            expect(moneySplit('1000')).toBe('1,000')
        })
        it('0 => 0 (int and number)', () => {
            expect(moneySplit(0)).toBe('0')
            expect(moneySplit('0')).toBe('0')
        })
        it('1000000.22446655 => 1,000,000.22446655 (int and number)', () => {
            expect(moneySplit(1000000.22446655)).toBe('1,000,000.22,446,655')
            expect(moneySplit('1000000.22446655')).toBe('1,000,000.22,446,655')
        })
        it('null,undefined,"",obj,NaN => 0', () => {
            expect(moneySplit(null)).toBe('0')
            expect(moneySplit(undefined)).toBe('0')
            expect(moneySplit('')).toBe('0')
            expect(moneySplit({})).toBe('0')
            expect(moneySplit(NaN)).toBe('0')
        })
    })
    
    describe('func secondTrans()', () => {
        it('3600秒 => 01:00:00', () => {
            expect(secondTrans(3600)).toBe('01:00:00')
        })
        it('32900秒 => 09:15:00', () => {
            expect(secondTrans(32900)).toBe('09:08:20')
        })
        it('50900秒 => 14:15:00', () => {
            expect(secondTrans(50900)).toBe('14:08:20')
        })
    })

    describe('func fixedTwo()', () => {
        it('900 => 900.00', () => {
            expect(fixedTwo(900)).toBe('900.00')
            expect(fixedTwo('900')).toBe('900.00')
        })
        it('111 => 111.00', () => {
            expect(fixedTwo(111)).toBe('111.00')
            expect(fixedTwo('111')).toBe('111.00')
        })
        it('0 => 0.00', () => {
            expect(fixedTwo(0)).toBe('0.00')
            expect(fixedTwo('0')).toBe('0.00')
        })
        it('0.123123 => 0.12', () => {
            expect(fixedTwo(0.123123)).toBe('0.12')
            expect(fixedTwo('0.123123')).toBe('0.12')
        })
        it('Object => 0.00', () => {
            expect(fixedTwo({})).toBe('0.00')
            expect(fixedTwo([])).toBe('0.00')
        })
    })
})