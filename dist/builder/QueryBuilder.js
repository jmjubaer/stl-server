"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    search(searchAbleFields) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.queryModel = this.queryModel.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeField.forEach((elm) => delete queryObj[elm]);
        // Handle tags filter separately — supports multiple tags
        if (this.query.tags) {
            const tags = Array.isArray(this.query.tags)
                ? this.query.tags
                : this.query.tags.split(',');
            queryObj.tags = { $in: tags };
        }
        this.queryModel = this.queryModel.find(queryObj);
        return this;
    }
    sort() {
        const sort = this?.query?.sort?.split(',')?.join(' ') || '-createdAt';
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    paginate() {
        const limit = Number(this?.query?.limit) || 10;
        const page = Number(this?.query?.page) || 1;
        const skip = (page - 1) * limit;
        this.queryModel = this.queryModel.skip(skip).limit(limit);
        return this;
    }
    fields() {
        const fields = this?.query?.fields?.split(',')?.join(' ') || '-__v';
        this.queryModel = this?.queryModel.select(fields);
        return this;
    }
    async countTotal() {
        const totalQueries = this.queryModel.getFilter();
        const total = await this.queryModel.model.countDocuments(totalQueries);
        const limit = Number(this?.query?.limit) || 10;
        const page = Number(this?.query?.page) || 1;
        const totalPage = Math.ceil(total / limit);
        return { limit, page, total, totalPage };
    }
}
exports.default = QueryBuilder;
