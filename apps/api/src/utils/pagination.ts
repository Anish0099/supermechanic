export const paginate = (array: any[], pageSize: number, pageNumber: number) => {
    const offset = (pageNumber - 1) * pageSize;
    const paginatedItems = array.slice(offset, offset + pageSize);
    const totalPages = Math.ceil(array.length / pageSize);
    
    return {
        pageNumber,
        pageSize,
        totalPages,
        totalItems: array.length,
        items: paginatedItems,
    };
};