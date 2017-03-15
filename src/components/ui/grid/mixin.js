export default{
    methods:{
        setCellWidth(column, index, top){
         
            let width = '';
            if (column.width) {
                width = column.width;
            } else if (this.columnsWidth[column._index]) {
                width = this.columnsWidth[column._index].width;
            }
            // when browser has scrollBar,set a width to resolve scroll position bug
            if (this.columns.length === index + 1 && top && this.$parent.bodyHeight !== 0) {
                width += this.$parent.scrollBarWidth;
            }
            // when fixed type,reset first right fixed column's width
            if (this.fixed === 'right') {
                const firstFixedIndex = this.columns.findIndex((col) => col.fixed === 'right');
                if (firstFixedIndex === index) width += this.$parent.scrollBarWidth;
            }
            return width;
        }
    }
}