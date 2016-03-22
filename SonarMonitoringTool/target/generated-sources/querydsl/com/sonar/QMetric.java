package com.sonar;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;

import alex.iamandi.SonarMonitoringTool.Metric;


/**
 * QMetric is a Querydsl query type for Metric
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QMetric extends EntityPathBase<Metric> {

    private static final long serialVersionUID = -1362568152L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMetric metric = new QMetric("metric");

    public final StringPath date = createString("date");

    public final StringPath frmt_val = createString("frmt_val");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath key = createString("key");

    public final QProject project;

    public final StringPath val = createString("val");

    public QMetric(String variable) {
        this(Metric.class, forVariable(variable), INITS);
    }

    public QMetric(Path<? extends Metric> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QMetric(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QMetric(PathMetadata<?> metadata, PathInits inits) {
        this(Metric.class, metadata, inits);
    }

    public QMetric(Class<? extends Metric> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.project = inits.isInitialized("project") ? new QProject(forProperty("project")) : null;
    }

}

